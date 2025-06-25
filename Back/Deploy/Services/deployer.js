import Config from '../Config/index.js';
import InstanceConfig from '../Models/instance-config.js';
import EC2Manager from './Aws/ec2-manager.js';
import ELBManager from './Aws/elb-manager.js';

class Deployer {
  constructor() {    
    this.config = new InstanceConfig();
  }

  async waitForInstanceRunning(instanceId) {
    let instanceRunning = false;
    while (!instanceRunning) {
      await new Promise(r => setTimeout(r, 5000));
      const response = await this.ec2Manager.describeInstance(instanceId);
      const state = response.Reservations?.[0]?.Instances?.[0]?.State?.Name;
      console.log(`Estado actual: ${state}`);
      if (state === 'running') instanceRunning = true;
    }
  }

  async deployInstance(index) {
    console.log(`Creando instancia ${index + 1}...`);
    
    const params = this.config.getInstanceParams(index);
    const response = await this.ec2Manager.createInstance(params);
    const instanceId = response.Instances?.[0].InstanceId;

    if (!instanceId) {
      throw new Error("No se pudo obtener el ID de la instancia");
    }

    await this.waitForInstanceRunning(instanceId);

    if (this.config.Type[index] === "Elastic") {
      await this.ec2Manager.associateElasticIP(instanceId, this.config.IPs[index]);
    } else {
      await this.elbManager.registerTarget(
        this.config.IPs[index],
        instanceId,
        this.config.Port_Target[index]
      );
    }
  }

  async deployAll() {

    var cont = 0;
    var cont2 = 1;
    var List = [8,8,8]
    try {

      for (let i = 0; i < this.config.Scripts.length; i++) {        
        
        if (cont == 0) {
          this.ec2Manager = new EC2Manager(Config.awsRegion, Config.credentials(cont2));
          this.elbManager = new ELBManager(Config.awsRegion, Config.credentials(cont2));          
        }        

        if (cont == List[cont2 - 1]) {
          cont = 0;
          cont2++;
        }
        else {
          cont++;
        }
              
        await this.deployInstance(i);       
      }
      console.log("Instancias creadas y IPs asignadas.");
    } catch (error) {
      console.log(error);
      console.log("Hubo un error creando las instancias.");
    }
    process.exit();
  }
}

export default Deployer;