const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
);

const connectPostgres = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('PostgreSQL connected and synced');
};

module.exports = { sequelize, connectPostgres };
