const jwt = require('jsonwebtoken');
const db = require('../config/db');

async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    try {
        // 1️⃣ vérifier si le token est blacklisté
        const [rows] = await db.query(
            "SELECT id FROM token_blacklist WHERE token = ?",
            [token]
        );

        if (rows.length > 0) {
            return res.status(401).json({
                message: 'Token expiré (logout)'
            });
        }

        // 2️⃣ vérifier le JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(403).json({
            message: 'Token invalide',
            error: err.message
        });
    }
}

module.exports = authMiddleware;
