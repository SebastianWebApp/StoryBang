import dotenv from "dotenv";
import { Kafka } from "kafkajs";

dotenv.config();

export const TOPIC = process.env.KAFKA_TOPIC;
export const KAFKA_PORT = process.env.KAFKA_PORT;

export const kafka = new Kafka({
    clientId: "verification",
    brokers: [KAFKA_PORT]
});