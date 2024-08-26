const Kit = require('../models/kit.model');

const createKit = async (kitData) => {
  const kit = new Kit(kitData);
  await kit.save();
  return kit;
};

const getKits = async () => {
  return await Kit.find();
};

const getKitById = async (id) => {
  return await Kit.findById(id);
};

const updateKit = async (productId, kitData) => {
    return await Kit.findOneAndUpdate({ productId: productId }, kitData, { new: true });
};  

const deleteKit = async (id) => {
  return await Kit.findByIdAndDelete(id);
};

module.exports = {
  createKit,
  getKits,
  getKitById,
  updateKit,
  deleteKit
};
