// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { addUser, loginUser } = require('../controllers/userController');

// Route pour ajouter un utilisateur
router.post('/add', addUser);
// Route pour connecter un utilisateur
router.post('/login', loginUser);

module.exports = router;
