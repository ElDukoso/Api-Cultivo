const Crop = require('../models/crop.model');
const Kit = require('../models/kit.model');

const createCrop = async (cropData) => {
  // Verificar si el productId es válido y está disponible
  const kit = await Kit.findOne({ productId: cropData.productId, available: true });
  if (!kit) {
    throw new Error('El ID del producto no es válido o ya ha sido utilizado.');
  }
  const existingCrop = await Crop.findOne({ userId: cropData.userId, productId: cropData.productId });
  if (existingCrop) {
    throw new Error('Este kit de cultivo ya ha sido registrado por el usuario.');
  }
  const crop = new Crop(cropData);
  await crop.save();
  kit.available = false;
  await kit.save();

  return crop;
};

const getCropsByUser = async (userId) => {
  return await Crop.find({ userId });
};

const getCropById = async (id) => {
  return await Crop.findById(id);
};

const getAllCrops = async () => {
  const crops = await Crop.find({});
  return crops;  // Retorna los cultivos sin datos de usuario
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
