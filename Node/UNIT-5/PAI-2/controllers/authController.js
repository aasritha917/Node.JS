const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.create({ email, password, role });
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password)))
            return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '10m' });
    console.log(`Reset Link: /api/v1/auth/reset-password/${token}`);
    res.json({ message: 'Reset link sent to console.' });
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email });
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password updated.' });
    } catch (err) {
        next(err);
    }
};
