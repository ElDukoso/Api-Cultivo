const Sensor = require('../models/sensor.model');

// Crear un nuevo sensor
const createSensor = async (sensorData) => {
    const { cropId, type, unit } = sensorData;

    const sensor = new Sensor({
        cropId,
        type,
        unit,
    });

    await sensor.save();
    return sensor;
};

// Obtener todos los sensores
const getSensors = async () => {
    return await Sensor.find({}, 'cropId type unit');
};

// Obtener un sensor por ID
const getSensorById = async (id) => {
    return await Sensor.findById(id, 'cropId type unit');
};

// Eliminar un sensor por ID
const deleteSensor = async (id) => {
    return await Sensor.findByIdAndDelete(id);
};

// Actualizar un sensor por ID
const updateSensor = async (id, sensorData) => {
    const updatedSensor = await Sensor.findByIdAndUpdate(id, sensorData, {
        new: true,
        runValidators: true,
    }).select('cropId type unit');
    return updatedSensor;
};

module.exports = {
    createSensor,
    getSensors,
    getSensorById,
    deleteSensor,
    updateSensor
};
