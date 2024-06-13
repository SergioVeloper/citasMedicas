const Specialty = require('../models/specialty');

// Crear una nueva especialidad
const createSpecialty = async (req, res) => {
  try {
    const specialty = await Specialty.create(req.body);
    res.status(201).json(specialty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una especialidad por ID
const getSpecialtyById = async (req, res) => {
  try {
    const { id } = req.params;
    const specialty = await Specialty.findOne({
      where: { specialty_id: id }
    });
    if (specialty) {
      res.status(200).json(specialty);
    } else {
      res.status(404).json({ error: 'Especialidad no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las especialidades
const getAllSpecialties = async (req, res) => {
  try {
    const specialties = await Specialty.findAll();
    res.status(200).json(specialties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una especialidad por ID
const updateSpecialty = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Specialty.update(req.body, {
      where: { specialty_id: id }
    });
    if (updated) {
      const updatedSpecialty = await Specialty.findOne({ where: { specialty_id: id } });
      return res.status(200).json({ specialty: updatedSpecialty });
    }
    throw new Error('Especialidad no encontrada');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Eliminar una especialidad por ID
const deleteSpecialty = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Specialty.destroy({
      where: { specialty_id: id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      throw new Error('Especialidad no encontrada');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSpecialty,
  getSpecialtyById,
  getAllSpecialties,
  updateSpecialty,
  deleteSpecialty
};
