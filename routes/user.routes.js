const { Router } = require('express');
const { check, param } = require('express-validator');
const { createUserController, getUsersController, getUserByIdController, deleteUserController } = require('../controllers/user.controller');
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

module.exports = router;

