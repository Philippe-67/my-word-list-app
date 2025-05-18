// backend/controllers/userController.js
const User = require('../models/User');

// Fonction pour ajouter un utilisateur
const addUser = async (req, res) => {
    const { username, password, email } = req.body;

      // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }
    
    const newUser = new User({ username, password, email });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { addUser };
