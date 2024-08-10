const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { editProfile } = require('../controllers/editController');
const upload = require('../middleware/uploadMiddleware');


router.put('/profile', authenticate, upload.single('image'), editProfile);

module.exports = router;
