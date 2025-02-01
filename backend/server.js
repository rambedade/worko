import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import candidateRoutes from './routes/candidateRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/candidates', candidateRoutes);

// ✅ Add a Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Candidate Referral Management API!');
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and Start the Server
connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
