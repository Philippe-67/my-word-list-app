// backend/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');


// Fonction pour ajouter un utilisateur
const addUser = async (req, res) => {
    const { username, password, email } = req.body;

      // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

      // Hash le mot de passe avant de le sauvegarder
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, email });

    try {
        const savedUser = await newUser.save();
        // Créer un token JWT
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { username: savedUser.username, email: savedUser.email } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Fonction pour connecter un utilisateur
const loginUser = async (req, res) => {
    const { email, password } = req.body;

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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { username: user.username, email: user.email } });
};

module.exports = { addUser, loginUser };


