const { response } = require('express');

const { createKit,
        getKits,
        getKitById,
        updateKit,
        deleteKit, } = require('../services/kit.services');

const createKitController = async (req, res = response) => {
    try {
        const kit = await createKit(req.body);
        res.status(201).json({
            ok: true,
            kit
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el kit'
        });
    }
};

const getKitsController = async (req, res = response) => {
    try {
        const kits = await getKits();
        res.status(200).json({
            ok: true,
            kits
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los kits'
        });
    };
};

const getKitByIdController = async (req, res = response) => {
    try {
        const kit = await getKitById(req.params.id);
        if (!kit) {
            return res.status(404).json({
                ok: false,
                msg: 'Kit no encontrado'
            });
        };
        res.status(200).json({
            ok: true,
            kit
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener el kit'
        });
    };
};

const updateKitController = async (req, res = response) => {
    const { productId } = req.params; 
    try {
      const kit = await updateKit(productId, req.body); 
      if (!kit) {
        return res.status(404).json({
          ok: false,
          msg: 'Kit no encontrado',
        });
      }
      res.json({
        ok: true,
        kit,
      });
    } catch (error) {
      console.error('Error al actualizar el kit:', error.message);
      res.status(500).json({
        ok: false,
        msg: 'Error al actualizar el kit'
      });
    }
  };

const deleteKitController = async (req, res) => {
    try {
        const kit = await deleteKit(req.params.id);
        if (!kit) {
            return res.status(404).json({
                ok: false,
                msg: 'Kit no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Kit eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el kit'
        });
    };
};

module.exports = {
    createKitController,
    getKitsController,
    getKitByIdController,
    updateKitController,
    deleteKitController
};
