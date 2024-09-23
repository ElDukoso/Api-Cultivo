const { Router } = require('express');
const { check, param } = require('express-validator');
const {
    createUserController,
    getUsersController,
    getUserByIdController,
    deleteUserController,
    updateUserController,
    loginUserController
} = require('../controllers/user.controller');

const validateFields = require('../middelware/validate-field');

const router = Router();

// Ruta para registro de usuarios
router.post(
    '/',
    [
        check('username').not().isEmpty().withMessage('Nombre de Usuario requerido').isLength({ max: 50 }),
        check('email').isEmail().withMessage('Se requiere un email válido').isLength({ max: 100 }),
        check('password').not().isEmpty().withMessage('Contraseña requerida').isLength({ max: 255 }),
        validateFields
    ],
    createUserController
);

// Ruta para login de usuarios
router.post(
    '/login',
    [
        check('email').isEmail().withMessage('Se requiere un email válido'),
        check('password').not().isEmpty().withMessage('Contraseña requerida'),
        validateFields
    ],
    loginUserController
);

// Obtener todos los usuarios
router.get('/', getUsersController);

// Obtener un usuario por ID
router.get(
    '/:id',
    [
        param('id').exists().withMessage('El ID es obligatorio').bail()
                   .isMongoId().withMessage('ID de Usuario no válido'),
        validateFields
    ],
    getUserByIdController
);

// Eliminar un usuario por ID
router.delete(
    '/:id',
    [
        param('id').exists().withMessage('El ID es obligatorio').bail()
                   .isMongoId().withMessage('ID de Usuario no válido'),
        validateFields
    ],
    deleteUserController
);

// Actualizar un usuario por ID
router.patch(
    '/:id',
    [
        param('id').isMongoId().withMessage('ID de Usuario no válido'),
        check('username').optional().isString().isLength({ max: 50 }).withMessage('Username no puede exceder los 50 caracteres'),
        check('email').optional().isEmail().withMessage('Email no válido').isLength({ max: 100 }).withMessage('Email no puede exceder los 100 caracteres'),
        validateFields
    ],
    updateUserController
);

module.exports = router;