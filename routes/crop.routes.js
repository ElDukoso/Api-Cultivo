const { Router } = require('express');
const { check, param } = require('express-validator');
const {
    createCropController,
    getCropsByUserController,
    getCropByIdController,
    deleteCropController,
} = require('../controllers/crop.controller');

const validateFields = require('../middelware/validate-field');

const router = Router();

// Ruta para crear un cultivo
router.post(
    '/',
    [
        check('userId').isMongoId().withMessage('El ID del usuario no es válido'),
        check('name').not().isEmpty().withMessage('El nombre del cultivo es requerido').isLength({ max: 100 }),
        check('plantingDate').isDate().withMessage('La fecha de siembra es requerida'),
        validateFields,
    ],
    createCropController
);

// Ruta para obtener todos los cultivos de un usuario
router.get('/user/:userId', [
    param('userId').isMongoId().withMessage('El ID del usuario no es válido'),
    validateFields,
], getCropsByUserController);

// Ruta para obtener un cultivo por su ID
router.get('/:id', [
    param('id').isMongoId().withMessage('El ID del cultivo no es válido'),
    validateFields,
], getCropByIdController);

// Ruta para eliminar un cultivo por su ID
router.delete('/:id', [
    param('id').isMongoId().withMessage('El ID del cultivo no es válido'),
    validateFields,
], deleteCropController);

module.exports = router;