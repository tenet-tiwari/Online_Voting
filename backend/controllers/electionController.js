// controllers/electionController.js
const Election = require('../models/Election');

exports.addElection = async (req, res) => {
    try {
        // Role check is now based on req.user set by the middleware
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { name, description, date, location } = req.body;

        // Validate required fields
        if (!name || !description || !date || !location) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newElection = new Election({ name, description, date, location });
        await newElection.save();

        res.status(201).json({ message: 'Election added successfully', election: newElection });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getAllElections = async (req, res) => {
    try {
        const elections = await Election.find();
        res.status(200).json(elections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.deleteElection = async (req, res) => {
    try {
        // Role check is now based on req.user set by the middleware
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { id } = req.params;

        // Validate ID
        if (!id) {
            return res.status(400).json({ error: 'Election ID is required' });
        }

        // Find and delete the election
        const election = await Election.findByIdAndDelete(id);

        if (!election) {
            return res.status(404).json({ error: 'Election not found' });
        }

        res.status(200).json({ message: 'Election deleted successfully', election });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};