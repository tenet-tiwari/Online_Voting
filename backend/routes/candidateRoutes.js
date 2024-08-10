const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { addCandidate,getAllCandidates , deleteCandidate } = require('../controllers/candidateController');
const upload = require('../middleware/uploadMiddleware');


router.post('/add', authenticate, upload.fields([
    { name: 'candidateImage' },
    { name: 'partyLogo' },
]), addCandidate);
router.get('/', getAllCandidates);
router.delete('/:id', authenticate, deleteCandidate);

module.exports = router;














