const { Schema, model } = require('mongoose');

const SensorReadingSchema = new Schema({
  cropId: {
    type: String,
    required: true
  },
  sensorId: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = model('SensorReading', SensorReadingSchema);