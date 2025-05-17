// backend/controllers/wordController.js
const WordList = require('../models/WordList');

// Fonction pour ajouter un mot
const addWord = async (req, res) => {
    const newWord = new WordList(req.body);
    try {
        const savedWord = await newWord.save();
        res.status(201).json(savedWord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour récupérer tous les mots
const getAllWords = async (req, res) => {
    try {
        const words = await WordList.find();
        res.status(200).json(words);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour mettre à jour un mot
const updateWord = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedWord = await WordList.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedWord) return res.status(404).json({ message: 'Mot non trouvé' });
        res.status(200).json(updatedWord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour supprimer un mot
const deleteWord = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedWord = await WordList.findByIdAndDelete(id);
        if (!deletedWord) return res.status(404).json({ message: 'Mot non trouvé' });
        res.status(204).send(); // Envoie un statut 204 No Content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addWord,
    getAllWords,
    updateWord,
    deleteWord,
};
