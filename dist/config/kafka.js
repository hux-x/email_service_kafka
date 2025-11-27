"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureConsumer = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: "mail-service",
    brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "mail-service-group" });
const configureConsumer = async () => {
    await consumer.connect();
    await consumer.subscribe({
        topic: "emails",
        fromBeginning: false,
    });
};
exports.configureConsumer = configureConsumer;
exports.default = consumer;
//# sourceMappingURL=kafka.js.map