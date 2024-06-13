const Patient = require('../models/patient');
const User = require('../models/user');

// Crear un nuevo paciente
const createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un paciente por ID
const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findOne({
            where: { patient_id: id },
            include: [User]  // Incluye la relación con el modelo User
        });
        if (patient) {
            res.status(200).json(patient);
        } else {
            res.status(404).json({ error: 'Paciente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los pacientes
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({ include: [User] });  // Incluye la relación con el modelo User
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un paciente por ID
const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Patient.update(req.body, {
            where: { patient_id: id }
        });
        if (updated) {
            const updatedPatient = await Patient.findOne({ where: { patient_id: id }, include: [User] });
            return res.status(200).json(updatedPatient);
        }
        res.status(404).json({ error: 'Paciente no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un paciente por ID
const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Patient.destroy({
            where: { patient_id: id }
        });
        if (deleted) {
            res.status(204).send('Paciente eliminado correctamente');
        }
        throw new Error('Paciente no encontrado');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPatient,
    getPatientById,
    getAllPatients,
    updatePatient,
    deletePatient
};