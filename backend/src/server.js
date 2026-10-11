require('dotenv').config();
const app = require('./app');
const { connectPostgres } = require('./config/postgres');
const connectMongo = require('./config/mongo');
const { connect: connectRabbitMQ } = require('./services/rabbitmq');
const startEmailWorker = require('./workers/emailWorker');
const logger = require('./config/logger');

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectPostgres();
  await connectMongo().catch((err) => logger.warn(`MongoDB skipped: ${err.message}`));
  await connectRabbitMQ().catch((err) => logger.warn(`RabbitMQ skipped: ${err.message}`));
  await startEmailWorker().catch((err) => logger.warn(`Email worker skipped: ${err.message}`));
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
};

start().catch((err) => {
  logger.error(`Startup error: ${err.message}`);
  process.exit(1);
});
