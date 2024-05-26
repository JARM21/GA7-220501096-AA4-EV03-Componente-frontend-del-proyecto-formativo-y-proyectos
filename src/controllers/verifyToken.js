const jwt = require('jsonwebtoken');
const config = require('../config');



function verifyToken(req, res, next){
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token de sesión no proporcionado.' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
        return res.status(401).json({ message: 'Token de sesión inválido.' });
        }

        req.userId = decoded.id; // Almacenar el ID del usuario en el objeto de solicitud para usarlo en otras rutas
        next();
    });
}

module.exports = verifyToken;