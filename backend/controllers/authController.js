







// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
    try {
        const { role, name, gender, dob, aadharCardId, voterIdCard, email, password, adminPassKey } = req.body;
        const image = req.file;

        
        // Validate required fields
        if (!role || !name || !gender || !dob || !aadharCardId || !voterIdCard || !email || !password || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check admin pass key for admin role
        if (role === 'admin' && adminPassKey !== process.env.ADMIN_PASS_KEY) {
            return res.status(400).json({ error: 'Invalid admin pass key' });
        }

        // Hash the password before saving
        //const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            role,
            name,
            gender,
            dob,
            aadharCardId,
            voterIdCard,
            email,
            password,
            image: req.file.path, // Image URL from Multer/Cloudinary
            ...(role === 'admin' && { adminPassKey }) // Conditionally add adminPassKey
        });

        await newUser.save();

        // Generate token
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { role, email, password, voterIdCard, aadharCardId, adminPassKey } = req.body;
        

        // Validate required fields
        if (!role || !email || !password || !voterIdCard || !aadharCardId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.findOne({ email, voterIdCard, aadharCardId });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if (role === 'admin' && adminPassKey !== process.env.ADMIN_PASS_KEY) {
            return res.status(400).json({ error: 'Invalid admin pass key' });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsersWithRole = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Retrieve all users with the role 'user'
        const users = await User.find({ role: 'user' });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== 'user') {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Retrieve all users with the role 'user'
        const users = await User.find({ role: 'user' });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

