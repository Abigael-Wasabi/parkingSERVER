const  Sequelize  = require('sequelize');
require('dotenv').config({ path: './.env' });

const sequelize = new Sequelize({
  dialect: 'mysql',
  logging: false,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME, 
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = sequelize; 