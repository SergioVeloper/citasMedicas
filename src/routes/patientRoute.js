const express = require('express');
const router = express.Router();
const {
    createPatient,
    getPatientById,
    getAllPatients,
    updatePatient,
    deletePatient
} = require('../controllers/patientController');

// Rutas para pacients
router.post('/', createPatient);           
router.get('/:id', getPatientById);         
router.get('/', getAllPatients);            
router.put('/:id', updatePatient);          
router.delete('/:id', deletePatient);       

module.exports = router;