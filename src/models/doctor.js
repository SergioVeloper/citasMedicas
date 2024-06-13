const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Specialty = require('./specialty');

const Doctor = sequelize.define('Doctor', {
    doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    license_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        },
        allowNull: false
    },
    specialty_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Specialty,
            key: 'specialty_id'
        },
        allowNull: false
    }
}, {
    tableName: 'doctors',
    timestamps: false
});

// Define la relación entre Doctor y User
Doctor.belongsTo(User, { foreignKey: 'user_id' });
Doctor.belongsTo(Specialty, { foreignKey: 'specialty_id' });

module.exports = Doctor;
