const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de importar la instancia de Sequelize
const User = require('./user'); // Importa el modelo User

const Patient = sequelize.define('Patient', {
    patient_id: {
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
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
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
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // Hace referencia al modelo User
            key: 'user_id' // Hace referencia a la columna user_id en User
        },
        allowNull: false
    }
}, {
    tableName: 'patients',
    timestamps: false // Desactiva los timestamps automáticos (createdAt y updatedAt)
});

// Define la relación: un Patient pertenece a un User
Patient.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Patient;
