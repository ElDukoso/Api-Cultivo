const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
  passwordHash: {
    type: String,
    required: true,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('User', UserSchema);