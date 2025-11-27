import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "mail-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "mail-service-group" });
export const configureConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "emails",
    fromBeginning: false,
  });
};


export default consumer;
