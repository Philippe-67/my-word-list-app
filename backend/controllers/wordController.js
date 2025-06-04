// backend/controllers/wordController.js
const WordList = require('../models/WordList');

// Fonction pour ajouter un mot
const addWord = async (req, res) => {
    const { frenchWord, englishWord } = req.body;
    const userId = req.user.id; // Assurez-vous que l'utilisateur est authentifié

    const newWord = new WordList({ userId, frenchWord, englishWord }); // Inclure l'ID de l'utilisateur
    try {
        const savedWord = await newWord.save();
        res.status(201).json(savedWord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour récupérer tous les mots d'un utilisateur
const getUserWords = async (req, res) => {
    const userId = req.user.id; // Assurez-vous que l'utilisateur est authentifié

    try {
        const words = await WordList.find({ userId }); // Récupérer les mots associés à l'utilisateur
        res.status(200).json(words);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour mettre à jour un mot
const updateWord = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Assurez-vous que l'utilisateur est authentifié

    try {
        const updatedWord = await WordList.findOneAndUpdate(
            { _id: id, userId }, // Vérifiez que l'ID de l'utilisateur correspond
            req.body,
            { new: true }
        );
        if (!updatedWord) return res.status(404).json({ message: 'Mot non trouvé ou accès non autorisé' });
        res.status(200).json(updatedWord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour supprimer un mot
const deleteWord = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Assurez-vous que l'utilisateur est authentifié

    try {
        const deletedWord = await WordList.findOneAndDelete({ _id: id, userId }); // Vérifiez que l'ID de l'utilisateur correspond
        if (!deletedWord) return res.status(404).json({ message: 'Mot non trouvé ou accès non autorisé' });
        res.status(204).send(); // Envoie un statut 204 No Content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addWord,
    getUserWords,
    updateWord,
    deleteWord,
};
