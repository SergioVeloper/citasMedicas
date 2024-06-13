const Doctor = require('../models/doctor');
const User = require('../models/user');
const Specialty = require('../models/specialty');

// Crear un nuevo doctor
const createDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un doctor por ID
const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findOne({
            where: { doctor_id: id },
            include: [User, Specialty]  // Incluye la relación con los modelos User y Specialty
        });
        if (doctor) {
            res.status(200).json(doctor);
        } else {
            res.status(404).json({ error: 'Doctor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los doctores
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll({ include: [User, Specialty] });  // Incluye la relación con los modelos User y Specialty
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un doctor por ID
const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Doctor.update(req.body, {
            where: { doctor_id: id }
        });
        if (updated) {
            const updatedDoctor = await Doctor.findOne({ where: { doctor_id: id }, include: [User, Specialty] });
            return res.status(200).json(updatedDoctor);
        }
        res.status(404).json({ error: 'Doctor no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un doctor por ID
const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Doctor.destroy({
            where: { doctor_id: id }
        });
        if (deleted) {
            return res.status(204).send(); // Enviar respuesta 204 sin contenido
        }
        res.status(404).json({ error: 'Doctor no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDoctor,
    getDoctorById,
    getAllDoctors,
    updateDoctor,
    deleteDoctor
};
