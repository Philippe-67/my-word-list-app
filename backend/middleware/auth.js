// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Accès refusé');
    
    // Extraire le token après "Bearer "
    const tokenValue = token.split(' ')[1]; // Prend la deuxième partie après "Bearer"
    console.log('Token reçu:', tokenValue); // Log du token reçu

    try {
        const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = verified; // Assigne les informations de l'utilisateur à req.user
        next();
    } catch (err) {
        console.error('Erreur de vérification du token:', err); // Log d'erreur
        res.status(400).send('Token non valide');
    }
};

module.exports = auth;
