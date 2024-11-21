const express = require('express'); // Import express
const router = express.Router(); // Create a router instance
const User = require('../models/user'); // Import the User model

// Get User Profile (no authentication middleware)
router.get('/', async (req, res) => {
    try {
        const userId = req.body.userId; 

        const user = await User.findById(userId).select('-password'); 
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
