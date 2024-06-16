const express = require('express');
const router = express.Router();
const {
    createHistory,
    getHistoryById,
    getAllHistories,
    updateHistory,
    deleteHistory
} = require('../controllers/historyController');

// Rutas para historiales
router.post('/', createHistory);            // Crear un nuevo historial
router.get('/:id', getHistoryById);         // Obtener un historial por ID
router.get('/', getAllHistories);           // Obtener todos los historiales
router.put('/:id', updateHistory);          // Actualizar un historial por ID
router.delete('/:id', deleteHistory);       // Eliminar un historial por ID

module.exports = router;