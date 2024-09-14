const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' });
        }

        req.user = user; // Guardar los datos del usuario para futuros usos
        next();
    });
};

module.exports = authenticateToken;
