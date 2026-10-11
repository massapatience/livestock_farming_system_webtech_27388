const amqplib = require('amqplib');
const { sendEmail } = require('../services/email');
const logger = require('../config/logger');

const startEmailWorker = async () => {
  const conn = await amqplib.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue('email_queue', { durable: true });
  channel.prefetch(1);

  logger.info('Email worker listening on email_queue');

  channel.consume('email_queue', async (msg) => {
    if (!msg) return;
    try {
      const payload = JSON.parse(msg.content.toString());
      await sendEmail(payload);
      logger.info(`Email sent to ${payload.to}`);
      channel.ack(msg);
    } catch (err) {
      logger.error(`Email worker error: ${err.message}`);
      channel.nack(msg, false, false);
    }
  });
};

module.exports = startEmailWorker;
