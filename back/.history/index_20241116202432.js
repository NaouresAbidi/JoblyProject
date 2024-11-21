const express = require('express');
const router = express.Router();
const User = require('./models/user');

// Get User Profile
router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;  // Use query parameters for GET request

        if (!userId) {
            return res.status(400).json({ msg: 'User ID is required' });
        }

        const user = await User.findById(userId).select('-password'); // Find user without password
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user); // Send user data as JSON
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
