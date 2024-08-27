const { Schema, model } = require('mongoose');

const ParameterSchema = new Schema({
  cropId: {
    type: String,
    ref: 'Crop',
    required: true,
  },
  parameterName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  minValue: {
    type: Number,
  },
  maxValue: {
    type: Number,
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

module.exports = model('Parameter', ParameterSchema);