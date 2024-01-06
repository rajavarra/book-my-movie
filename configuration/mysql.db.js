const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_CREDS,
  {
    dialect: process.env.DATABASE_DIALECT,
    host: 'localhost',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  }
);

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sequelize, connectDb };
