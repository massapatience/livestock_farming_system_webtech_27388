const amqplib = require('amqplib');
const logger = require('../config/logger');

let channel;

const connect = async () => {
  const conn = await amqplib.connect(process.env.RABBITMQ_URL);
  channel = await conn.createChannel();
  await channel.assertQueue('email_queue', { durable: true });
  await channel.assertQueue('sms_queue', { durable: true });
  logger.info('RabbitMQ connected');
};

const publishToQueue = (queue, message) => {
  if (!channel) { logger.warn('RabbitMQ not connected, skipping queue publish'); return; }
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
};

module.exports = { connect, publishToQueue };
