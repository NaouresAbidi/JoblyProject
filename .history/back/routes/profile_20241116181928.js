const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model
const { check, validationResult } = require('express-validator'); // Optional: For request validation
const auth = require('../middleware/auth'); // Middleware to authenticate user

// Get user profile
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
