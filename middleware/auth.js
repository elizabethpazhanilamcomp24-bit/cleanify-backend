const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication invalid: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user to the job routes
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication invalid: Token is not valid' });
    }
};

module.exports = auth;