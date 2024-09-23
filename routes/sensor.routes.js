const { Router } = require('express');
const { check, param } = require('express-validator');
const {
    createSensorController,
    getSensorsController,
    getSensorByIdController,
    deleteSensorController,
    updateSensorController
} = require('../controllers/sensor.controller');

const validateFields = require('../middelware/validate-field');

const router = Router();

// Ruta para crear un sensor
router.post(
    '/',
    [
        check('cropId').not().isEmpty().withMessage('cropId es requerido'),
        check('type').not().isEmpty().withMessage('Tipo de sensor es requerido').isIn(['humidity', 'temperature']),
        check('unit').not().isEmpty().withMessage('Unidad es requerida').isLength({ max: 20 }),
        validateFields
    ],
    createSensorController
);

// Obtener todos los sensores
router.get('/', getSensorsController);

// Obtener un sensor por ID
router.get(
    '/:id',
    [
        param('id').exists().withMessage('El ID es obligatorio').bail().isMongoId().withMessage('ID de sensor no válido'),
        validateFields
    ],
    getSensorByIdController
);

// Eliminar un sensor por ID
router.delete(
    '/:id',
    [
        param('id').exists().withMessage('El ID es obligatorio').bail().isMongoId().withMessage('ID de sensor no válido'),
        validateFields
    ],
    deleteSensorController
);

// Actualizar un sensor por ID
router.patch(
    '/:id',
    [
        param('id').isMongoId().withMessage('ID de sensor no válido'),
        check('cropId').optional().isString(),
        check('type').optional().isIn(['humidity', 'temperature']),
        check('unit').optional().isLength({ max: 20 }),
        validateFields
    ],
    updateSensorController
);

module.exports = router;
