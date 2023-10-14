const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
}

module.exports = authMiddleware;