const Crop = require('../models/crop.model');

const createCrop = async (cropData) => {
  const crop = new Crop(cropData);
  await crop.save();
  return crop;
};

const getCropsByUser = async (userId) => {
  return await Crop.find({ userId });
};

const getCropById = async (id) => {
  return await Crop.findById(id);
};

const deleteCrop = async (id) => {
  return await Crop.findByIdAndDelete(id);
};

module.exports = {
  createCrop,
  getCropsByUser,
  getCropById,
  deleteCrop,
};
