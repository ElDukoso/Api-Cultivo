const { Router } = require('express');
const { check, param } = require('express-validator');
const { createUserController,
        getUsersController,
        getUserByIdController,
        deleteUserController,
        updateUserController } = require('../controllers/user.controller');
        
const validateFields = require('../middelware/validate-field');

const router = Router();

router.post(
    '/',
    [
        check('username').not().isEmpty().withMessage('Nombre de Usuario requerido').isLength({ max: 50 }),
        check('email').isEmail().withMessage('Se requiere un email invalido').isLength({ max: 100 }),
        check('passwordHash').not().isEmpty().withMessage('Contraseña requerida').isLength({ max: 255 }),
        validateFields
    ],
    createUserController
);

router.get('/', getUsersController);

router.get(
    '/:id',
    [
        param('id').exists().withMessage('El ID es obligatorio').bail()
                   .isMongoId().withMessage('Id de Usuario no valido'),
        validateFields
    ],
    getUserByIdController
);

router.delete(
    '/:id',
    [
        param('id').exists().withMessage('El ID es obligatorio').bail()
                   .isMongoId().withMessage('Id de Usuario no valido'),
        validateFields
    ],
    deleteUserController
);

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

