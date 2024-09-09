const { response } = require('express');
const { 
  createParameter, 
  getAllParameters, 
  getParameterById, 
  updateParameter, 
  deleteParameter 
} = require('../services/parameter.service');

// Crear un nuevo parámetro
const createParameterController = async (req, res = response) => {
  try {
    const parameter = await createParameter(req.body);
    res.status(201).json({
      ok: true,
      parameter
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al crear el parámetro'
    });
  }
};

// Obtener todos los parámetros
const getAllParametersController = async (req, res = response) => {
  try {
    const parameters = await getAllParameters();
    res.status(200).json({
      ok: true,
      parameters
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener los parámetros'
    });
  }
};

// Obtener un parámetro por ID
const getParameterByIdController = async (req, res = response) => {
  try {
    const parameter = await getParameterById(req.params.id);
    if (!parameter) {
      return res.status(404).json({
        ok: false,
        msg: 'Parámetro no encontrado'
      });
    }
    res.status(200).json({
      ok: true,
      parameter
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener el parámetro'
    });
  }
};

// Actualizar un parámetro por ID
const updateParameterController = async (req, res = response) => {
  try {
    const updatedParameter = await updateParameter(req.params.id, req.body);
    if (!updatedParameter) {
      return res.status(404).json({
        ok: false,
        msg: 'Parámetro no encontrado'
      });
    }
    res.status(200).json({
      ok: true,
      msg: 'Parámetro actualizado correctamente',
      parameter: updatedParameter
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al actualizar el parámetro'
    });
  }
};

// Eliminar un parámetro por ID
const deleteParameterController = async (req, res = response) => {
  try {
    const deletedParameter = await deleteParameter(req.params.id);
    if (!deletedParameter) {
      return res.status(404).json({
        ok: false,
        msg: 'Parámetro no encontrado'
      });
    }
    res.status(200).json({
      ok: true,
      msg: 'Parámetro eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar el parámetro'
    });
  }
};

module.exports = {
  createParameterController,
  getAllParametersController,
  getParameterByIdController,
  updateParameterController,
  deleteParameterController
};
