const express = require('express');
const router = express.Router();
const {
    createAppointment,
    getAppointmentById,
    getAllAppointments,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByDate,
    getAppointmentsPatient,
    getPaidAppointmentsByDateRange
} = require('../controllers/appointmentController');

// Rutas para citas
router.post('/', createAppointment);            // Crear una nueva cita
router.get('/:id', getAppointmentById);         // Obtener una cita por ID
router.get('/', getAllAppointments);            // Obtener todas las citas
router.put('/:id', updateAppointment);          // Actualizar una cita por ID
router.delete('/:id', deleteAppointment);       // Eliminar una cita por ID
router.get('/doctor/:id/date/:date', getAppointmentsByDate); // Obtener citas por fecha medico
router.get('/patient/:id', getAppointmentsPatient); // Obtener citas por fecha paciente
router.get('/patient_pay/:id', getPaidAppointmentsByDateRange); // Obtener citas pagadas por rango de fechas

module.exports = router;