const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient');
const Doctor = require('./doctor');
const Appointment = require('./appointment');

const History = sequelize.define('History', {
    history_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    patient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Patient,
            key: 'patient_id'
        },
        allowNull: false
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Doctor,
            key: 'doctor_id'
        },
        allowNull: false
    },
    appointment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Appointment,
            key: 'appointment_id'
        },
        allowNull: false
    },
    diagnosis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    treatment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'history',
    timestamps: false
});

// Define la relación entre History, Patient, Doctor y Appointment
History.belongsTo(Patient, { foreignKey: 'patient_id' });
History.belongsTo(Doctor, { foreignKey: 'doctor_id' });
History.belongsTo(Appointment, { foreignKey: 'appointment_id' });

module.exports = History;
