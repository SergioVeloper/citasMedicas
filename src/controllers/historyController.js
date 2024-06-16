const History = require('../models/history');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');

// Crear un nuevo historial
const createHistory = async (req, res) => {
    try {
        const history = await History.create(req.body);
        res.status(201).json(history);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un historial por ID
const getHistoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await History.findOne({
            where: { history_id: id },
            include: [Patient, Doctor, Appointment]  // Incluye la relación con los modelos Patient, Doctor y Appointment
        });
        if (history) {
            res.status(200).json(history);
        } else {
            res.status(404).json({ error: 'Historial no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los historiales
const getAllHistories = async (req, res) => {
    try {
        const histories = await History.findAll({ include: [Patient, Doctor, Appointment] });  // Incluye la relación con los modelos Patient, Doctor y Appointment
        res.status(200).json(histories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un historial por ID
const updateHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await History.update(req.body, {
            where: { history_id: id }
        });
        if (updated) {
            const updatedHistory = await History.findOne({ where: { history_id: id }, include: [Patient, Doctor, Appointment] });
            return res.status(200).json(updatedHistory);
        }
        res.status(404).json({ error: 'Historial no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un historial por ID
const deleteHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await History.destroy({
            where: { history_id: id }
        });
        if (deleted) {
            res.status(204).end();
        }
        res.status(404).json({ error: 'Historial no encontrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createHistory,
    getHistoryById,
    getAllHistories,
    updateHistory,
    deleteHistory
};