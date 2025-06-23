import { kafka, TOPIC } from "../Config/kafka.config.js";

export class KafkaService {
    static async createTopicIfNotExists(topicName) {
        const admin = kafka.admin();
        try {
            await admin.connect();
            const topics = await admin.listTopics();

            if (!topics.includes(topicName)) {
                await admin.createTopics({
                    topics: [
                        {
                            topic: topicName,
                            numPartitions: 10,
                            replicationFactor: 1
                        }
                    ]
                });
                console.log(`📦 Topic '${topicName}' created`);
            } else {
                console.log(`📦 Topic '${topicName}' already exists`);
            }
        } catch (error) {
            console.log("Error: Kafka server is not running.");
        } finally {
            await admin.disconnect();
        }
    }

    static async sendMessage(data) {
        const producer = kafka.producer();
        try {
            await producer.connect();
            await producer.send({
                topic: TOPIC,
                messages: [
                    { value: JSON.stringify(data) }
                ]
            });
        } finally {
            await producer.disconnect();
        }
    }
}