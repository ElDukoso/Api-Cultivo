const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { loginUser } = require('../services/auth.service');


// Crear un nuevo usuario
const createUser = async (userData) => {
    const { username, email, password } = userData;

    // Hashear la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario con la contraseña encriptada
    const user = new User({
        username,
        email,
        passwordHash,  // Guardamos el hash de la contraseña
    });

    await user.save();
    return user;
};

// Obtener todos los usuarios
const getUsers = async () => {
    return await User.find({}, 'username email');
};

// Obtener un usuario por ID
const getUserById = async (id) => {
    return await User.findById(id, 'username email');
};

// Eliminar un usuario por ID
const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

const updateUser = async (id, userData) => {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
        new: true,           
        runValidators: true, 
    }).select('username email'); 
    return updatedUser;
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
};
