const express = require('express');
const router = express.Router();
const { submitQuery,getAllQueries,deleteQuery } = require('../controllers/queryController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/submit', submitQuery);
router.get('/',authenticate,getAllQueries);
router.delete('/del/:id',authenticate,deleteQuery);

module.exports = router;
