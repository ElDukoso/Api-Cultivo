const express = require('express');
const router = express.Router();

const { createKitController,
        getKitsController,
        getKitByIdController,
        updateKitController,
        deleteKitController } = require('../controllers/kit.controller');

// Crear un nuevo kit
router.post('/', createKitController);

// Obtener todos los kits
router.get('/', getKitsController);

// Obtener un kit por ID
router.get('/:id', getKitByIdController);

// Actualizar un kit por ID
router.patch('/:productId', updateKitController);


// Eliminar un kit por ID
router.delete('/:id', deleteKitController);

module.exports = router;
