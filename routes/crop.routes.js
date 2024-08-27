const { Router } = require('express');
const { check, param } = require('express-validator');
const {
  createCropController,
  getCropsByUserController,
  getCropByIdController,
  deleteCropController,
  updateCropNameController,
  getAllCropsController
} = require('../controllers/crop.controller');

const validateFields = require('../middelware/validate-field');

const router = Router();

// Ruta para crear un cultivo
router.post(
  '/',
  [
    check('userId').isString().withMessage('El ID del usuario debe ser una cadena de texto'),
    check('name').not().isEmpty().withMessage('El nombre del cultivo es requerido').isLength({ max: 100 }),
    check('productId').not().isEmpty().withMessage('El ID del producto es requerido'),
    check('plantingDate').isDate().withMessage('La fecha de siembra es requerida'),
    validateFields
  ],
  createCropController
);

// Ruta para obtener todos los cultivos de un usuario
router.get('/user/:userId', [
  param('userId').isString().withMessage('El ID del usuario debe ser una cadena de texto'),
  validateFields
], getCropsByUserController);

// Ruta para obtener un cultivo por su ID
router.get('/:id', [
  param('id').isString().withMessage('El ID del cultivo debe ser una cadena de texto'),
  validateFields
], getCropByIdController);

// Ruta para obtener todos los cultivos
router.get('/', getAllCropsController);

// Ruta para eliminar un cultivo por su ID
router.delete('/:id', [
  param('id').isString().withMessage('El ID del cultivo debe ser una cadena de texto'),
  validateFields
], deleteCropController);

router.patch(
  '/:id',
  [
    param('id', 'ID no válido').isString(), // Validación de que el ID es una cadena de texto
    check('name', 'El nombre del cultivo es requerido').not().isEmpty().isLength({ max: 100 }), // Validación del nuevo nombre
    validateFields
  ],
  updateCropNameController
);

module.exports = router;