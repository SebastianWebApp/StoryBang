import Config from '../Config/index.js';
import InstanceConfig from '../Models/instance-config.js';
import EC2Manager from './Aws/ec2-manager.js';
import ELBManager from './Aws/elb-manager.js';

class Deployer {
  constructor() {    
    this.config = new InstanceConfig();
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

        console.log(`Estado actual de ${instanceId}: ${state}`);

        if (state === 'running') {
          console.log(Name_Instance)
          instanceRunning = true;
        }
      } catch (err) {
        if (err.Code === 'InvalidInstanceID.NotFound') {
          console.log(`Instancia ${instanceId} aún no está disponible. Reintentando...`);
          retryCount++;
        } else {
          console.log("Estado: "+ err+ "  "+ Name_Instance)          
          throw err;
        }
      }
    }

    if (!instanceRunning) {
      throw new Error(`La instancia ${instanceId} no se volvió visible después de ${maxRetries} intentos.`);
    }
  }

  async deployInstance(index, ec2Manager, elbManager) {
    console.log(`Creando instancia ${index + 1}...`);
    
    const params = this.config.getInstanceParams(index);
    const response = await ec2Manager.createInstance(params);
    const instanceId = response.Instances?.[0].InstanceId;

    if (!instanceId) {
      throw new Error("No se pudo obtener el ID de la instancia");
    }

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
    const List = [9, 2];
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
            console.log(`Cuenta ${accountNumber}: creando instancia ${i + 1}`);
            await this.deployInstance(startIndex + i, ec2Manager, elbManager);
            console.log(`Cuenta ${accountNumber}: instancia ${i + 1} completada`);
          } catch (error) {
            console.error(`Error en cuenta ${accountNumber}, instancia ${i + 1}:`, error);
          }
        }
      })();
    });

    try {
      await Promise.all(deployPerAccount);
      console.log("Todas las instancias fueron creadas correctamente.");
    } catch (err) {
      console.error("Hubo un error en el despliegue general:", err);
    }

    process.exit();
  }




}

export default Deployer;