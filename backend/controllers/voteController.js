// controllers/voteController.js

const Vote = require('../models/Vote');
const Candidate = require('../models/Candidate');
const Election = require('../models/Election');
const User = require('../models/User');

exports.castVote = async (req, res) => {
    try {
        // Ensure the user is a regular user
        //console.log(req.user);
        if (req.user.role !== 'user') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { candidateId, electionId } = req.body;

        // Verify that the candidate and election exist
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({ error: 'Election not found' });
        }

        // Ensure the user hasn't already voted in this election
        const existingVote = await Vote.findOne({ userId: req.user.userId, electionId });
        if (existingVote) {
            return res.status(400).json({ error: 'User has already voted in this election' });
        }

        // Create a new vote
        const vote = new Vote({
            userId: req.user.userId,
            candidateId,
            electionId,
            dateTime: new Date()
        });

        await vote.save();

        res.status(201).json({ message: 'Vote cast successfully', vote });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllVotes = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        const votes = await Vote.find().populate('userId').populate('candidateId').populate('electionId');
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};