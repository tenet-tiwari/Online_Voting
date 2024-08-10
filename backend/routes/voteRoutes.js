// routes/voteRoutes.js

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { castVote,getAllVotes } = require('../controllers/voteController');

router.post('/cast', authenticate, castVote);
router.get('/all',authenticate, getAllVotes);

module.exports = router;
