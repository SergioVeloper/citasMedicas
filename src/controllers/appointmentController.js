const Appointment = require('../models/appointment');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

// Crear una nueva cita
const createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una cita por ID
const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findOne({
            where: { appointment_id: id },
            include: [Patient, Doctor]  // Incluye la relación con los modelos Patient y Doctor
        });
        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ error: 'Cita no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las citas
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({ include: [Patient, Doctor] });  // Incluye la relación con los modelos Patient y Doctor
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una cita por ID
const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Appointment.update(req.body, {
            where: { appointment_id: id }
        });
        if (updated) {
            const updatedAppointment = await Appointment.findOne({ where: { appointment_id: id }, include: [Patient, Doctor] });
            return res.status(200).json(updatedAppointment);
        }
        res.status(404).json({ error: 'Cita no encontrada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una cita por ID
const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Appointment.destroy({
            where: { appointment_id: id }
        });
        if (deleted) {
            res.status(204).send('Cita eliminada');
        }
        throw new Error('Cita no encontrada');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener appointments por fecha y status
const getAppointmentsByDate = async (req, res) => {
    try {
        const { id, date } = req.params; // Obtener el valor de date desde los parámetros de la URL
        const { status } = req.query; // Obtener el valor de status desde los parámetros de consulta

        // Validación básica de los parámetros de entrada
        if (!date || !status || !id) {
            return res.status(400).json({ error: 'Se requieren date y status en la consulta' });
        }

        const appointments = await Appointment.findAll({
            where: {
                appointment_date: date,
                doctor_id: id,
                status: status
            },
            include: [Patient, Doctor]  // Incluye las relaciones con los modelos Patient y Doctor si están definidas
        });

        if (appointments.length > 0) {
            res.status(200).json(appointments);
        } else {
            res.status(404).json({ error: 'Citas no encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener appointments por paciente y status
const getAppointmentsPatient = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el valor de date desde los parámetros de la URL
        const { status } = req.query; // Obtener el valor de status desde los parámetros de consulta

        // Validación básica de los parámetros de entrada
        if (!status || !id) {
            return res.status(400).json({ error: 'Se requieren date y status en la consulta' });
        }

        const appointments = await Appointment.findAll({
            where: {
                patient_id: id,
                status: status
            },
            include: [Patient, Doctor]  // Incluye las relaciones con los modelos Patient y Doctor si están definidas
        });

        if (appointments.length > 0) {
            res.status(200).json(appointments);
        } else {
            res.status(404).json({ error: 'Citas no encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener citas pagadas por un paciente en un rango de fechas
const { Op } = require('sequelize');
const getPaidAppointmentsByDateRange = async (req, res) => {
    try {
        const { id: patient_id } = req.params;
        const { startDate, endDate, pay } = req.query;

        if (!patient_id || !startDate || !endDate || typeof pay === 'undefined') {
            return res.status(400).json({ error: 'Se requieren patient_id, startDate, endDate y pay en la consulta' });
        }

        // Convertir las fechas a objetos Date para la consulta
        const start = new Date(startDate);
        const end = new Date(endDate);
        const payStatus = pay.toLowerCase() === 'true';

        const appointments = await Appointment.findAll({
            where: {
                patient_id: patient_id,
                appointment_date: {
                    [Op.between]: [start, end]
                },
                pay: payStatus
            },
            include: [Patient, Doctor]
        });

        if (appointments.length > 0) {
            res.status(200).json(appointments);
        } else {
            res.status(404).json({ error: 'Citas no encontradas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAppointment,
    getAppointmentById,
    getAllAppointments,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate,
    getAppointmentsPatient,
    getPaidAppointmentsByDateRange
};