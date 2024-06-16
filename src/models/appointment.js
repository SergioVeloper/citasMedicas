const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient');
const Doctor = require('./doctor');

const Appointment = sequelize.define('Appointment', {
    appointment_id: {
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
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attendance_status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    pay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'appointment',
    timestamps: false
});

//Define la relación entre Appointment, Patient y Doctor
Appointment.belongsTo(Patient, {foreignKey: 'patient_id'});
Appointment.belongsTo(Doctor, {foreignKey: 'doctor_id'});

module.exports = Appointment;