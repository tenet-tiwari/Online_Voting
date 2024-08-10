const User = require('../models/User');

exports.editProfile = async (req, res) => {
    try {
        // Ensure the user is a regular user

        if (req.user.role !== 'user') {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Fetch the user from the database
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { name, dob, email, password } = req.body;

        // Update user details
        if (name) user.name = name;
        if (dob) user.dob = dob;
        if (email) user.email = email;
        if (password) user.password = password;

        // Update user image if provided
        if (req.file) {
            user.image = req.file.path;
        }

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
