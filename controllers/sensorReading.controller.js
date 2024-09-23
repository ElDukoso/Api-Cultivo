const sensorReadingService = require('../services/sensorReading.service');

// Crear una nueva lectura de sensor
const createSensorReading = async (req, res) => {
  try {
    const newReading = await sensorReadingService.createSensorReading(req.body);
    res.status(201).json({
      ok: true,
      sensorReading: newReading
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al crear la lectura del sensor',
      error: error.message
    });
  }
};

// Obtener todas las lecturas de sensor o filtradas por `cropId` o `sensorId`
const getSensorReadings = async (req, res) => {
  try {
    const { cropId, sensorId } = req.query; // Filtrado opcional
    const filter = {};
    if (cropId) filter.cropId = cropId;
    if (sensorId) filter.sensorId = sensorId;

    const readings = await sensorReadingService.getSensorReadings(filter);
    res.status(200).json({
      ok: true,
      sensorReadings: readings
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener las lecturas del sensor',
      error: error.message
    });
  }
};

// Obtener una lectura de sensor por su ID
const getSensorReadingById = async (req, res) => {
  try {
    const { id } = req.params;
    const reading = await sensorReadingService.getSensorReadingById(id);
    if (!reading) {
      return res.status(404).json({
        ok: false,
        msg: 'Lectura de sensor no encontrada'
      });
    }
    res.status(200).json({
      ok: true,
      sensorReading: reading
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al obtener la lectura del sensor',
      error: error.message
    });
  }
};

// Eliminar una lectura de sensor por su ID
const deleteSensorReadingById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReading = await sensorReadingService.deleteSensorReadingById(id);
    if (!deletedReading) {
      return res.status(404).json({
        ok: false,
        msg: 'Lectura de sensor no encontrada'
      });
    }
    res.status(200).json({
      ok: true,
      msg: 'Lectura de sensor eliminada',
      sensorReading: deletedReading
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar la lectura del sensor',
      error: error.message
    });
  }
};

module.exports = {
  createSensorReading,
  getSensorReadings,
  getSensorReadingById,
  deleteSensorReadingById,
};
