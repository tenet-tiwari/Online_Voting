const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
    candidateName: { type: String, required: true },
    candidateImage: { type: String, required: true },
    partyName: { type: String, required: true },
    partyLogo: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
