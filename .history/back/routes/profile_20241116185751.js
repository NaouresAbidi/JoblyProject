const express = require('express'); // Import express
const router = express.Router(); // Create a router instance
const User = require('..user/models/user'); // Import the User model

// Get User Profile (no authentication middleware)
router.get('/', async (req, res) => {
    try {
        // You will need some way to identify the user, e.g., by query parameter or request body
        // For example, if you are passing the user ID in the request body (not recommended for production)
        const userId = req.body.userId; // Adjust this according to how you identify user

        const user = await User.findById(userId).select('-password'); // Get user without password
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user); // Send user data as JSON
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Export the router
module.exports = router;
