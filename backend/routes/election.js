// routes/election.js
const express = require('express');
const router = express.Router();
const { addElection,getAllElections,deleteElection } = require('../controllers/electionController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/add', authenticate, addElection);
router.get('/',getAllElections);
router.delete('/:id', authenticate, deleteElection);

module.exports = router;
