const express = require('express');
const router = express.Router();
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Rutas para usuarios
router.get('/', getAllUsers);          // Obtener todos los usuarios
router.post('/', createUser);          // Crear un nuevo usuario
router.get('/:id', getUserById);       // Obtener un usuario por ID
router.put('/:id', updateUser);        // Actualizar un usuario por ID
router.delete('/:id', deleteUser);     // Eliminar un usuario por ID

module.exports = router;
