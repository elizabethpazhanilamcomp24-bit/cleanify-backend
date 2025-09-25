const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Although the frontend doesn't have a register page, it's essential for the backend
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        });

        res.status(200).json({ user: { email: user.email }, token });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

module.exports = { register, login };