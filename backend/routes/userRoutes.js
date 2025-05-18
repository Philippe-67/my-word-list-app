// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/userController');

// Route pour ajouter un utilisateur
router.post('/add', addUser);

module.exports = router;
