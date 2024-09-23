const { Router } = require('express');
const {
  createSensorReading,
  getSensorReadings,
  getSensorReadingById,
  deleteSensorReadingById
} = require('../controllers/sensorReading.controller');

const router = Router();

// Ruta para crear una nueva lectura de sensor
router.post('/', createSensorReading);

// Ruta para obtener todas las lecturas de sensor, opcionalmente filtradas por `cropId` o `sensorId`
router.get('/', getSensorReadings);

// Ruta para obtener una lectura de sensor por su ID
router.get('/:id', getSensorReadingById);

// Ruta para eliminar una lectura de sensor por su ID
router.delete('/:id', deleteSensorReadingById);

module.exports = router;
