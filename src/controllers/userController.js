const User = require('../models/user');
const Role = require('../models/role');

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { user_id: id },
      include: Role  // Incluye la relación con el modelo Role
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: Role });  // Incluye la relación con el modelo Role
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { user_id: id }
    });
    if (updated) {
      const updatedUser = await User.findOne({ where: { user_id: id }, include: Role });
      return res.status(200).json(updatedUser);
    }
    res.status(404).json({ error: 'Usuario no encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { user_id: id }
    });
    if (deleted) {
      return res.status(204).send('Usuario eliminado');
    }
    res.status(404).json({ error: 'Usuario no encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
};
