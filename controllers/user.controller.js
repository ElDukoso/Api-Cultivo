const { response } = require('express');
const { createUser, getUsers, getUserById, deleteUser, updateUser } = require('../services/user.service');

// Crear un usuario
const createUserController = async (req, res = response) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            ok: true,
            user
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Error al crear Usuario'
        });
    }
};

// Obtener todos los usuarios
const getUsersController = async (req, res = response) => {
    try {
        const users = await getUsers();
        res.status(200).json({
            ok: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al buscar usuarios'
        });
    };
};

// Obtener un usuario por ID
const getUserByIdController = async (req, res = response) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

// Eliminar un usuario por ID
const deleteUserController = async (req, res = response) => {
    try {
        const user = await deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar usuario'
        });
    };
};

const updateUserController = async (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    try {
        const updatedUser = await updateUser(id, { username, email });
        if (!updatedUser) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado',
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado correctamente',
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario',
        });
    }
};

module.exports = {
    createUserController,
    getUsersController,
    getUserByIdController,
    deleteUserController,
    updateUserController
};
