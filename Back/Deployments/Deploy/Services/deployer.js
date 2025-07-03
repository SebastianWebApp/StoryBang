import Config from '../Config/index.js';
import InstanceConfig from '../Models/instance-config.js';
import EC2Manager from './Aws/ec2-manager.js';
import ELBManager from './Aws/elb-manager.js';
import logger from "./logs.service.js";
import { WhatsappService } from "./whatsapp.service.js";
import { twilioConfig, createTwilioClient } from "../Config/twilio.config.js";


class Deployer {
  constructor() {    
    this.twilioClient = createTwilioClient();
    this.whatsappService = new WhatsappService(this.twilioClient, twilioConfig.whatsappFrom);
    this.config = new InstanceConfig();
    this.instanceIds = [];
  }
  
  async waitForInstanceRunning(instanceId, ec2Manager, Name_Instance) {
    let instanceRunning = false;
    let retryCount = 0;
    const maxRetries = 10;

    while (!instanceRunning && retryCount < maxRetries) {
      try {
        await new Promise(r => setTimeout(r, 5000));
        const response = await ec2Manager.describeInstance(instanceId);
        const state = response.Reservations?.[0]?.Instances?.[0]?.State?.Name;

        logger.info(`Current status of ${instanceId}: ${state}`);

        if (state === 'running') {
          instanceRunning = true;
          await this.whatsappService.sendMessage(`The instance ${Name_Instance} (${instanceId}) is still "running"`,twilioConfig.phone);
        }
      } catch (err) {
        if (err.Code === 'InvalidInstanceID.NotFound') {
          logger.warn(`Instance ${instanceId} is still not available. Retrying...`);
          retryCount++;
        } else {
          logger.error("Status: "+ err);
          throw err;          
        }
      }
    }

    if (!instanceRunning) {
      logger.error(`Instance ${instanceId} did not become visible after ${maxRetries} attempts.`);
      throw new Error(`Instance ${instanceId} did not become visible after ${maxRetries} attempts.`);
    }
  }

  async deployInstance(index, ec2Manager, elbManager) {   
    logger.info(`Creating instance ${index + 1}...`);

    const params = this.config.getInstanceParams(index);
    const response = await ec2Manager.createInstance(params);
    const instanceId = response.Instances?.[0].InstanceId;

    if (!instanceId) {
      logger.error("Could not retrieve the instance ID");
      throw new Error("Could not retrieve the instance ID");
    }

    this.instanceIds.push({ instanceId, index });
    await this.waitForInstanceRunning(instanceId, ec2Manager, this.config.Names[index]);

    if (this.config.Type[index] === "Elastic") {
      await ec2Manager.associateElasticIP(instanceId, this.config.IPs[index]);
    } else {
      await elbManager.registerTarget(
        this.config.IPs[index],
        instanceId,
        this.config.Port_Target[index]
      );
    }
  }

  async deployAll() {
    const List = [9,2];
    const baseIndex = [0];

    for (let i = 1; i < List.length; i++) {
      baseIndex[i] = baseIndex[i - 1] + List[i - 1];
    }

    const deployPerAccount = List.map((instanceCount, accountIdx) => {
      return (async () => {
        const accountNumber = accountIdx + 1;
        const startIndex = baseIndex[accountIdx];

        const ec2Manager = new EC2Manager(Config.awsRegion, Config.credentials(accountNumber));
        const elbManager = new ELBManager(Config.awsRegion, Config.credentials(accountNumber));

        for (let i = 0; i < instanceCount; i++) {
          try {
            logger.info(`Account ${accountNumber}: creating instance ${i + 1}`);

            await this.deployInstance(startIndex + i, ec2Manager, elbManager);
            logger.info(`Account ${accountNumber}: instance ${i + 1} completed`);

          } catch (error) {
            logger.error(`Error in account ${accountNumber}, instance ${i + 1}: ${error.message}`, { error });
          }
        }
      })();
    });

    try {
      await Promise.all(deployPerAccount);
      logger.info("All instances were created successfully.");
      await this.monitorInstances(); // Iniciar monitoreo después del despliegue
    } catch (err) {
      logger.error(`An error occurred during the overall deployment: ${err.message}`, { error: err });
    }

  }


  async monitorInstances() {
    const checkInterval = 60 * 1000; 
    const List = [9,2]; 
    const baseIndex = [0];

    for (let i = 1; i < List.length; i++) {
      baseIndex[i] = baseIndex[i - 1] + List[i - 1];
    }

    const ec2Managers = {};
    for (let accountIdx = 0; accountIdx < List.length; accountIdx++) {
      ec2Managers[accountIdx + 1] = new EC2Manager(
        Config.awsRegion,
        Config.credentials(accountIdx + 1)
      );
    }

    const getAccountIndex = (instanceIndex) => {
      for (let i = 0; i < baseIndex.length; i++) {
        const start = baseIndex[i];
        const end = (baseIndex[i + 1] !== undefined) ? baseIndex[i + 1] : Infinity;
        if (instanceIndex >= start && instanceIndex < end) {
          return i + 1;
        }
      }
      return 1; 
    };

    const checkStatus = async () => {
      for (const { instanceId, index } of this.instanceIds) {
        const accountIdx = getAccountIndex(index);
        const ec2Manager = ec2Managers[accountIdx];

        try {
          const response = await ec2Manager.describeInstance(instanceId);
          const state = response.Reservations?.[0]?.Instances?.[0]?.State?.Name;
          const name = this.config.Names[index];

          if (state !== 'running') {
            await this.whatsappService.sendMessage(`⚠️ ALERT: Instance ${name} (${instanceId}) is in state "${state}"`,twilioConfig.phone);
            logger.error(`⚠️ ALERT: Instance ${name} (${instanceId}) is in state "${state}"`);
          } else {
            logger.info(`✅ Monitoring: The instance ${name} (${instanceId}) is still "running"`);
          }
        } catch (err) {
          logger.error(`❌ Error monitoring instance ${instanceId}: ${err.message}`, { error: err });

        }
      }

      setTimeout(checkStatus, checkInterval);
    };

    checkStatus();
  }



}

export default Deployer;