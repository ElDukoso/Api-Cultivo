const { response } = require('express');
const { createCrop, getCropsByUser, getCropById, deleteCrop, updateCropName, getAllCrops } = require('../services/crop.service');

// Crear un cultivo
const createCropController = async (req, res = response) => {
  try {
    const crop = await createCrop(req.body);
    res.status(201).json({
      ok: true,
      crop
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al crear el cultivo',
    });
  }
};

// Obtener todos los cultivos de un usuario
const getCropsByUserController = async (req, res = response) => {
  try {
    const crops = await getCropsByUser(req.params.userId);
    res.status(200).json({
      ok: true,
      crops
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al obtener los cultivos',
    });
  }
};

// Obtener un cultivo por su ID
const getCropByIdController = async (req, res = response) => {
  try {
    const crop = await getCropById(req.params.id);
    if (!crop) {
      return res.status(404).json({
        ok: false,
        msg: 'Cultivo no encontrado',
      });
    }
    res.status(200).json({
      ok: true,
      crop,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al obtener el cultivo',
    });
  }
};

// Obtener todos los cultivos
const getAllCropsController = async (req, res = response) => {
  try {
    const crops = await getAllCrops();
    res.json({
      ok: true,
      crops
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los cultivos'
    });
  }
};

// Eliminar un cultivo por su ID
const deleteCropController = async (req, res = response) => {
  try {
    const crop = await deleteCrop(req.params.id);
    if (!crop) {
      return res.status(404).json({
        ok: false,
        msg: 'Cultivo no encontrado',
      });
    }
    res.status(200).json({
      ok: true,
      msg: 'Cultivo eliminado',
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al eliminar el cultivo',
    });
  }
};

// Actualizar el nombre de un cultivo
const updateCropNameController = async (req, res = response) => {
  const { id } = req.params; // Obtiene el ID del cultivo desde los parámetros de la URL
  const { name } = req.body; // Obtiene el nuevo nombre del cultivo desde el cuerpo de la solicitud
  try {
    const updatedCrop = await updateCropName(id, name);
    if (!updatedCrop) {
      return res.status(404).json({
        ok: false,
        msg: 'Cultivo no encontrado',
      });
    }
    res.json({
      ok: true,
      crop: updatedCrop,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar el cultivo',
    });
  }
};

module.exports = {
  createCropController,
  getCropsByUserController,
  getCropByIdController,
  deleteCropController,
  updateCropNameController,
  getAllCropsController
};
