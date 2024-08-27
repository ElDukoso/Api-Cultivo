const { Schema, model } = require('mongoose');

const KitSchema = new Schema({
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  });
  
  module.exports = model('Kit', KitSchema);