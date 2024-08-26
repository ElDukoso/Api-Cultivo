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

const getAllCrops = async () => {
  return await Crop.find({}).populate('userId', 'username email name'); // Opcional: Popula los datos del usuario relacionado
};

const deleteCrop = async (id) => {
  return await Crop.findByIdAndDelete(id);
};

const updateCropName = async (cropId, newName) => {
  const crop = await Crop.findByIdAndUpdate(
    cropId, 
    { name: newName, updatedAt: Date.now() }, 
    { new: true, runValidators: true }
  );
  return crop;
};

module.exports = {
  createCrop,
  getCropsByUser,
  getCropById,
  deleteCrop,
  updateCropName,
  getAllCrops
};
