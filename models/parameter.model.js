const { Schema, model } = require('mongoose');

const ParameterSchema = new Schema({
  cropType: {
    type: String,
    required: true,
    maxlength: 50,
  },
  idealTemperature: {
    type: Number,
    required: true, 
  },
  minTemperature: {
    type: Number,
    required: true,
  },
  maxTemperature: {
    type: Number,
    required: true, 
  },
  idealHumidity: {
    type: Number,
    required: true, 
  },
  minHumidity: {
    type: Number,
    required: true, 
  },
  maxHumidity: {
    type: Number,
    required: true,
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

ParameterSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = model('Parameter', ParameterSchema);
