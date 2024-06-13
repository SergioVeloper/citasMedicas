const express = require('express');
const router = express.Router();
const {
    createDoctor,
    getDoctorById,
    getAllDoctors,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctorController');

// Rutas para doctores
router.post('/', createDoctor);            // Crear un nuevo doctor
router.get('/:id', getDoctorById);         // Obtener un doctor por ID
router.get('/', getAllDoctors);            // Obtener todos los doctores
router.put('/:id', updateDoctor);          // Actualizar un doctor por ID
router.delete('/:id', deleteDoctor);       // Eliminar un doctor por ID

module.exports = router;
