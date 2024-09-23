const SensorReading = require('../models/sensorReading.model'); // Asegúrate de que la ruta sea correcta

// Crear una nueva lectura de sensor
const createSensorReading = async (data) => {
  const newReading = new SensorReading(data);
  return await newReading.save();
};

// Obtener todas las lecturas de sensor (opcionalmente filtrar por `cropId` o `sensorId`)
const getSensorReadings = async (filter = {}) => {
  return await SensorReading.find(filter);
};

// Obtener una lectura de sensor por su ID
const getSensorReadingById = async (id) => {
  return await SensorReading.findById(id);
};

// Eliminar una lectura de sensor por su ID
const deleteSensorReadingById = async (id) => {
  return await SensorReading.findByIdAndDelete(id);
};

module.exports = {
  createSensorReading,
  getSensorReadings,
  getSensorReadingById,
  deleteSensorReadingById,
};
