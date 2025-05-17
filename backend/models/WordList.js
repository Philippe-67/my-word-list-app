// backend/models/WordList.js
const mongoose = require('mongoose');

const wordListSchema = new mongoose.Schema({
    frenchWord: { type: String, required: true },
    englishWord: { type: String, required: true },
});

module.exports = mongoose.model('WordList', wordListSchema);
