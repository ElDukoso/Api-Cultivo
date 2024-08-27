const { Schema, model } = require('mongoose');

const CropSchema = new Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  productId: {
    type: String,  
    required: true,
    unique: true,  
  },
  plantingDate: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    maxlength: 255,
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

module.exports = model('Crop', CropSchema);
