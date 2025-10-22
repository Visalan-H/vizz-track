const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
};
