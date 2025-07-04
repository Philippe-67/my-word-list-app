// backend/routes/wordRoutes.js
const express = require('express');
const router = express.Router();
const {
    addWord,
    getUserWords,
    updateWord,
    deleteWord,
} = require('../controllers/wordController');

// Route pour ajouter un mot
router.post('/add-word', addWord);

// Route pour récupérer tous les mots
router.get('/', getUserWords,);

// Route pour mettre à jour un mot
router.put('/update/:id', updateWord);

// Route pour supprimer un mot
router.delete('/delete/:id', deleteWord);

module.exports = router;
