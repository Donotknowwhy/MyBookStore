const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require("../model/model")

const userController = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({ email, password: hashedPassword });

            await newUser.save();


            res.status(201).json({ message: "Register successfully" });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(404).json({ message: "User doesn't exist" });
            }

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    sendResetPasswordEmail: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
            const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
            // Gửi email đến người dùng với link reset password
            // ...
            res.status(200).json({ message: 'Reset password link sent successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to send reset password link', error });
        }
    }
}

module.exports = userController