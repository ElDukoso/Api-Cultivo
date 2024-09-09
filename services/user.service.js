const User = require('../models/user.model');

// Crear un nuevo usuario
const createUser = async (userData) => {
    const user = new User(userData);
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
