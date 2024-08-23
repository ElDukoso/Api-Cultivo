const { Schema, model } = require('mongoose');

const SensorSchema = new Schema({
  cropId: {
    type: Schema.Types.ObjectId,
    ref: 'Crop',
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['humidity', 'temperature', 'water', 'light', 'pH'],
    maxlength: 50,
  },
  unit: {
    type: String,
    required: true,
    maxlength: 20,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Sensor', SensorSchema);