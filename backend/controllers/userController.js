// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fonction pour ajouter un utilisateur
const addUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Hash le mot de passe avant de le sauvegarder
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword, email });

        const savedUser = await newUser.save();
        
       
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

// Fonction pour connecter un utilisateur
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Trouver l'utilisateur par email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérifier le mot de passe
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // Créer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Utilisez user._id pour la sécurité
        res.status(200).json({ token, user: { username: user.username, email: user.email } }); // Renvoyer le token et les informations de l'utilisateur
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' }); // Gérer les erreurs de manière sécurisée
    }
};

module.exports = { addUser, loginUser }; // Exportez les deux fonctions
