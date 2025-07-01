import { ElasticLoadBalancingV2Client, RegisterTargetsCommand } from "@aws-sdk/client-elastic-load-balancing-v2";
import AWSClient from './aws-client.js';

class ELBManager extends AWSClient {
  constructor(region, credential) {
    super(region);
    this.client = new ElasticLoadBalancingV2Client({ region, credentials: credential });
  }

  async registerTarget(targetGroupArn, instanceId, port) {
    const command = new RegisterTargetsCommand({
      TargetGroupArn: targetGroupArn,
      Targets: [{ Id: instanceId, Port: port }]
    });
    return this.client.send(command);
  }
}

export default ELBManager;