const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require("../model/model")

const userController = {
    register: async (req, res) => {
        try {
            const { email, password, role } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({ email, password: hashedPassword, role });

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
}

module.exports = userController