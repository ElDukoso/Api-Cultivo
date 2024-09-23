const { response } = require('express');
const { createSensor, getSensors, getSensorById, deleteSensor, updateSensor } = require('../services/sensor.service');

// Crear un sensor
const createSensorController = async (req, res = response) => {
    try {
        const sensor = await createSensor(req.body);
        res.status(201).json({
            ok: true,
            sensor
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al crear sensor'
        });
    }
};

// Obtener todos los sensores
const getSensorsController = async (req, res = response) => {
    try {
        const sensors = await getSensors();
        res.status(200).json({
            ok: true,
            sensors
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al buscar sensores'
        });
    }
};

// Obtener un sensor por ID
const getSensorByIdController = async (req, res = response) => {
    try {
        const sensor = await getSensorById(req.params.id);
        if (!sensor) {
            return res.status(404).json({
                ok: false,
                msg: 'Sensor no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            sensor
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un sensor por ID
const deleteSensorController = async (req, res = response) => {
    try {
        const sensor = await deleteSensor(req.params.id);
        if (!sensor) {
            return res.status(404).json({
                ok: false,
                msg: 'Sensor no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Sensor eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar sensor'
        });
    }
};

// Actualizar un sensor por ID
const updateSensorController = async (req, res) => {
    const { id } = req.params;
    const { cropId, type, unit } = req.body;
    try {
        const updatedSensor = await updateSensor(id, { cropId, type, unit });
        if (!updatedSensor) {
            return res.status(404).json({
                ok: false,
                msg: 'Sensor no encontrado',
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Sensor actualizado correctamente',
            sensor: updatedSensor,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar sensor',
        });
    }
};

module.exports = {
    createSensorController,
    getSensorsController,
    getSensorByIdController,
    deleteSensorController,
    updateSensorController
};
