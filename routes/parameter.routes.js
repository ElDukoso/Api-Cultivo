const { Router } = require('express');
const { check, param } = require('express-validator');
const { 
  createParameterController,
  getAllParametersController,
  getParameterByIdController,
  updateParameterController,
  deleteParameterController
} = require('../controllers/parameter.controller');

const validateFields = require('../middelware/validate-field');

const router = Router();

// Ruta para crear un nuevo parámetro
router.post(
  '/',
  [
    check('cropType').not().isEmpty().withMessage('El tipo de cultivo es requerido').isLength({ max: 50 }).withMessage('El tipo de cultivo no puede exceder los 50 caracteres'),
    check('idealTemperature').isNumeric().withMessage('La temperatura ideal debe ser un número').not().isEmpty().withMessage('La temperatura ideal es requerida'),
    check('minTemperature').isNumeric().withMessage('La temperatura mínima debe ser un número').not().isEmpty().withMessage('La temperatura mínima es requerida'),
    check('maxTemperature').isNumeric().withMessage('La temperatura máxima debe ser un número').not().isEmpty().withMessage('La temperatura máxima es requerida'),
    check('idealHumidity').isNumeric().withMessage('La humedad ideal debe ser un número').not().isEmpty().withMessage('La humedad ideal es requerida'),
    check('minHumidity').isNumeric().withMessage('La humedad mínima debe ser un número').not().isEmpty().withMessage('La humedad mínima es requerida'),
    check('maxHumidity').isNumeric().withMessage('La humedad máxima debe ser un número').not().isEmpty().withMessage('La humedad máxima es requerida'),
    validateFields
  ],
  createParameterController
);

// Ruta para obtener todos los parámetros
router.get('/', getAllParametersController);

// Ruta para obtener un parámetro por ID
router.get(
  '/:id',
  [
    param('id').exists().withMessage('El ID es obligatorio').bail()
               .isMongoId().withMessage('ID de parámetro no válido'),
    validateFields
  ],
  getParameterByIdController
);

// Ruta para actualizar un parámetro por ID
router.patch(
  '/:id',
  [
    param('id').exists().withMessage('El ID es obligatorio').bail()
               .isMongoId().withMessage('ID de parámetro no válido'),
    check('cropType').optional().isLength({ max: 50 }).withMessage('El tipo de cultivo no puede exceder los 50 caracteres'),
    check('idealTemperature').optional().isNumeric().withMessage('La temperatura ideal debe ser un número'),
    check('minTemperature').optional().isNumeric().withMessage('La temperatura mínima debe ser un número'),
    check('maxTemperature').optional().isNumeric().withMessage('La temperatura máxima debe ser un número'),
    check('idealHumidity').optional().isNumeric().withMessage('La humedad ideal debe ser un número'),
    check('minHumidity').optional().isNumeric().withMessage('La humedad mínima debe ser un número'),
    check('maxHumidity').optional().isNumeric().withMessage('La humedad máxima debe ser un número'),
    validateFields
  ],
  updateParameterController
);

// Ruta para eliminar un parámetro por ID
router.delete(
  '/:id',
  [
    param('id').exists().withMessage('El ID es obligatorio').bail()
               .isMongoId().withMessage('ID de parámetro no válido'),
    validateFields
  ],
  deleteParameterController
);

module.exports = router;