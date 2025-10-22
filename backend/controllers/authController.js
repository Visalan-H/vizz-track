const User = require('../models/User');
const { comparePasswords, hashPassword } = require('../services/bcrypt');
const { generateToken } = require('../services/jwt');

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken({ id: user._id });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const handleRegister = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const token = generateToken({ id: newUser._id });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

};

const handleLogout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    res.status(200).json({ message: 'Logout successful' });
};

const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password -__v');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    handleLogin,
    handleRegister,
    handleLogout,
    getMe
};