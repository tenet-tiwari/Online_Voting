const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');
const { authenticate } = require('../middleware/authMiddleware');


router.post('/register',upload.single('image'), authController.register);
router.post('/login', authController.login);
router.get('/users',authenticate, authController.getUsersWithRole);
router.get('/',authenticate, authController.getUsers);
//
module.exports = router;
