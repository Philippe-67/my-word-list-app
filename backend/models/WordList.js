// backend/models/WordList.js
const mongoose = require('mongoose');

const wordListSchema = new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'utilisateur
        required: true,
        ref: 'User', // Lien vers le modèle User
    },
    frenchWord: { type: String, required: true },
    englishWord: { type: String, required: true },
    categoryWord:{type:String,required:true}
});

module.exports = mongoose.model('WordList', wordListSchema);
