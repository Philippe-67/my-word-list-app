// backend/routes/wordRoutes.js
const express = require('express');
const router = express.Router();
const {
    addWord,
    getAllWords,
    updateWord,
    deleteWord,
} = require('../controllers/wordController');

// Route pour ajouter un mot
router.post('/add', addWord);

// Route pour récupérer tous les mots
router.get('/', getAllWords);

// Route pour mettre à jour un mot
router.put('/update/:id', updateWord);

// Route pour supprimer un mot
router.delete('/delete/:id', deleteWord);

module.exports = router;
