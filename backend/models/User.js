// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin']
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    dob: {
        type: Date,
        required: true
    },
    aadharCardId: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^(\d{12})$/.test(value); // Ensures exactly 12 digits
            },
            message: 'Aadhar Card ID must be exactly 12 digits long'
        }
    },
    voterIdCard: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return /^[A-Za-z0-9]{10}$/.test(value); // Ensures exactly 10 alphanumeric characters
            },
            message: 'Voter ID Card must be exactly 10 characters long'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    adminPassKey: {
        type: String,
        required: function () {
            return this.role === 'admin';
        }
    }
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
