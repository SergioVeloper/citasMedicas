const Role = require('../models/role');

//crear un nuevo rol
const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//obtener un rol por ID
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findOne({
      where: { role_id: id }
    });
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// actualizar un rol por ID
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Role.update(req.body, {
      where: { role_id: id }
    });
    if (updated) {
      const updatedRole = await Role.findOne({ where: { role_id: id } });
      return res.status(200).json({ role: updatedRole });
    }
    throw new Error('Rol no encontrado');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// eliminar un rol por ID
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Role.destroy({
      where: { role_id: id }
    });
    if (deleted) {
      return res.status(204).send("Rol eliminado");
    }
    throw new Error("Rol no encontrado");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createRole,
    getRoleById,
    getAllRoles,
    updateRole,
    deleteRole
};
