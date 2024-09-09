const Parameter = require('../models/parameter.model');

// Crear un nuevo parámetro
const createParameter = async (data) => {
  try {
    const newParameter = new Parameter(data);
    const savedParameter = await newParameter.save();
    return savedParameter;
  } catch (error) {
    throw new Error('Error al crear el parámetro: ' + error.message);
  }
};

// Obtener todos los parámetros
const getAllParameters = async () => {
  try {
    const parameters = await Parameter.find();
    return parameters;
  } catch (error) {
    throw new Error('Error al obtener los parámetros: ' + error.message);
  }
};

// Obtener un parámetro por ID
const getParameterById = async (id) => {
  try {
    const parameter = await Parameter.findById(id);
    if (!parameter) {
      throw new Error('Parámetro no encontrado');
    }
    return parameter;
  } catch (error) {
    throw new Error('Error al obtener el parámetro: ' + error.message);
  }
};

// Actualizar un parámetro por ID
const updateParameter = async (id, data) => {
  try {
    const updatedParameter = await Parameter.findByIdAndUpdate(id, data, { new: true });
    if (!updatedParameter) {
      throw new Error('Parámetro no encontrado');
    }
    return updatedParameter;
  } catch (error) {
    throw new Error('Error al actualizar el parámetro: ' + error.message);
  }
};

// Eliminar un parámetro por ID
const deleteParameter = async (id) => {
  try {
    const deletedParameter = await Parameter.findByIdAndDelete(id);
    if (!deletedParameter) {
      throw new Error('Parámetro no encontrado');
    }
    return deletedParameter;
  } catch (error) {
    throw new Error('Error al eliminar el parámetro: ' + error.message);
  }
};

module.exports = {
  createParameter,
  getAllParameters,
  getParameterById,
  updateParameter,
  deleteParameter,
};
