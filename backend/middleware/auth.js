// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Accès refusé');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Assigne les informations de l'utilisateur à req.user
        next();
    } catch (err) {
        res.status(400).send('Token non valide');
    }
};

module.exports = auth;
