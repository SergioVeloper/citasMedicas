// src/config/database.js
require('dotenv').config(); // Importa las variables de entorno desde el archivo .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: false,
});

module.exports = sequelize;

