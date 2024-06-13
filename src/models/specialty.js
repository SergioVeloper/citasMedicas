const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Specialty = sequelize.define('Specialty',{
    specialty_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'specialties',
    timestamps: false
});

module.exports = Specialty;