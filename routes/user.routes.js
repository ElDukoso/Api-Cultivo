const { Router } = require('express');
const { check, param } = require('express-validator');
const { createUserController, getUsersController, getUserByIdController, deleteUserController } = require('../controllers/user.controller');

const router = Router();

router.post(
    '/',
    [
        check('username').not().isEmpty().withMessage('Nombre de Usuario requerido').isLength({ max: 50 }),
        check('email').isEmail().withMessage('Email invalido').isLength({ max: 100 }),
        check('passwordHash').not().isEmpty().withMessage('Contraseña requerida').isLength({ max: 255 }),
    ],
    createUserController
);

router.get('/', getUsersController);

router.get(
    '/:id',
    [
        param('id').isMongoId().withMessage('Id de Usuario no valido'),
    ],
    getUserByIdController
);

router.delete(
    '/:id',
    [
        param('id').isMongoId().withMessage('Id de Usuario no valido'),
    ],
    deleteUserController
);

module.exports = router;

