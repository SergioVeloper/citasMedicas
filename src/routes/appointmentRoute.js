const express = require('express');
const router = express.Router();
const {
    createAppointment,
    getAppointmentById,
    getAllAppointments,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate
} = require('../controllers/appointmentController');

// Rutas para citas
router.post('/', createAppointment);            // Crear una nueva cita
router.get('/:id', getAppointmentById);         // Obtener una cita por ID
router.get('/', getAllAppointments);            // Obtener todas las citas
router.put('/:id', updateAppointment);          // Actualizar una cita por ID
router.delete('/:id', deleteAppointment);       // Eliminar una cita por ID
router.get('/date/:date', getAppointmentsByDate); // Obtener citas por fecha

module.exports = router;