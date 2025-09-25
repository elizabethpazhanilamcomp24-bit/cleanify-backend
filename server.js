require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const authRouter = require('./routes/auth');
const appointmentRouter = require('./routes/appointments');

// Import middleware
const authMiddleware = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors()); // Allows requests from your frontend
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/auth', authRouter);
app.use('/api/appointments', authMiddleware, appointmentRouter); // Protect the appointments route

// Simple route for testing
app.get('/', (req, res) => {
    res.send('<h1>Cleanify API</h1>');
});

const port = process.env.PORT || 4000;

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();