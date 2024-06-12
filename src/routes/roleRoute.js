const express = require('express');
const router = express.Router();
const {
  getAllRoles,
  createRole,
  getRoleById,
  updateRole,
  deleteRole
} = require('../controllers/roleController');

// Rutas para roles
router.get('/', getAllRoles);           // Obtener todos los roles
router.post('/', createRole);           // Crear un nuevo rol
router.get('/:id', getRoleById);        // Obtener un rol por ID
router.put('/:id', updateRole);         // Actualizar un rol por ID
router.delete('/:id', deleteRole);      // Eliminar un rol por ID

module.exports = router;
