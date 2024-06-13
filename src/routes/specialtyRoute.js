const express = require('express');
const router = express.Router();
const {
    createSpecialty,
    getSpecialtyById,
    getAllSpecialties,
    updateSpecialty,
    deleteSpecialty
} = require('../controllers/specialtyController');

//rutas para specialties
router.post('/', createSpecialty); //crear una nueva especialidad
router.get('/:id', getSpecialtyById); //obtener una especialidad por ID
router.get('/', getAllSpecialties); //obtener todas las especialidades
router.put('/:id', updateSpecialty); //actualizar una especialidad por ID
router.delete('/:id', deleteSpecialty); //eliminar una especialidad por ID

module.exports = router;