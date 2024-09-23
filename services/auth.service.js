const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Servicio de login
const loginUser = async (email, password) => {
    // Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // Comparar la contraseña ingresada con la hasheada
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }

    // Crear el payload para generar el token JWT
    const payload = {
        userId: user._id,
        username: user.username,
        email: user.email
    };

    // Firmar el token con tu clave secreta
    const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });

    return token;
};

module.exports = {
    loginUser
};
