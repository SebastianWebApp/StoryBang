import { EC2Client, RunInstancesCommand, DescribeInstancesCommand, AssociateAddressCommand } from "@aws-sdk/client-ec2";
import AWSClient from './aws-client.js';

class EC2Manager extends AWSClient {
  constructor(region, credential) {
    super(region);
    this.client = new EC2Client({ region, credentials: credential });
  }

  async createInstance(params) {
    const command = new RunInstancesCommand(params);
    return this.client.send(command);
  }

  async describeInstance(instanceId) {
    const command = new DescribeInstancesCommand({ InstanceIds: [instanceId] });
    return this.client.send(command);
  }

  async associateElasticIP(instanceId, allocationId) {
    const command = new AssociateAddressCommand({
      InstanceId: instanceId,
      AllocationId: allocationId
    });

    return this.client.send(command);
  }
}

export default EC2Manager;