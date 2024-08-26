const { Schema, model } = require('mongoose');

const CropSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  productId: {
    type: String,  // O puedes usar Number si prefieres un ID numérico
    required: true,
    unique: true,  // Asegura que el ID de producto sea único en la colección
  },
  plantingDate: {
    type: Date,
    required: true,
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
