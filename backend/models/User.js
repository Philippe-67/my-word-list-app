const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
     password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Assure que l'email est unique
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // La date de création par défaut est la date actuelle
    },
});
module.exports = mongoose.model('User', userSchema);