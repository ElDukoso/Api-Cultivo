const { Schema, model } = require('mongoose');

const IrrigationSchema = new Schema({
  cropId: {
    type: String,
    required: true
  },
  volume: {
    type: Number,
    required: true, // Volumen de agua en litros
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
});

module.exports = model('Irrigation', IrrigationSchema);