








const Candidate = require('../models/Candidate');
const Election = require('../models/Election');

exports.addCandidate = async (req, res) => {
    try {
        // Check if user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        

        
        const { electionName, candidateName, partyName } = req.body;
        
        // Verify election exists
        const election = await Election.findOne({ name: electionName });
        if (!election) {
            return res.status(404).json({ error: 'Election not found' });
        }

        // Get image URLs from Cloudinary
        //console.log(req.files);
        const candidateImageUrl = req.files['candidateImage'] ? req.files['candidateImage'][0].path : '';
        const partyLogoUrl = req.files['partyLogo'] ? req.files['partyLogo'][0].path : '';

        // console.log(candidateImageUrl);
        // console.log(partyLogoUrl);
    
        // Create new candidate
        const candidateData = {
            election: election._id,
            candidateName,
            partyName,
            candidateImage: candidateImageUrl, // Image URL from Cloudinary
            partyLogo: partyLogoUrl // Image URL from Cloudinary
        };

        //console.log(candidateData);

        const newCandidate = new Candidate(candidateData);
        await newCandidate.save();

        res.status(201).json({ message: 'Candidate added successfully', candidate: newCandidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllCandidates = async (req, res) => {
    try {
        // Retrieve all candidates from the database
        const candidates = await Candidate.find().populate('election', 'name date location');

        // Return the list of candidates
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCandidate = async (req, res) => {
    try {
        // Check if user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { id } = req.params; // Get candidate ID from the route parameters

        // Find and delete the candidate
        const deletedCandidate = await Candidate.findByIdAndDelete(id);

        if (!deletedCandidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        res.status(200).json({ message: 'Candidate deleted successfully', candidate: deletedCandidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};