const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa la instancia de Sequelize

const Role = sequelize.define('Role', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'role', // Asegúrate de que el nombre de la tabla sea correcto
  timestamps: false // Si no tienes timestamps en la tabla, desactívalos
});

module.exports = Role;

