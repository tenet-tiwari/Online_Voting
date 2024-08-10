// models/Vote.js

const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    electionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election',
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
