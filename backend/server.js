// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const wordRoutes = require('./routes/wordRoutes');
const userRoutes = require('./routes/userRoutes');
const auth = require('./middleware/auth'); 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/words',auth, wordRoutes); // Route API
app.use('/api/users', userRoutes); // Routes pour les utilisateurs


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
