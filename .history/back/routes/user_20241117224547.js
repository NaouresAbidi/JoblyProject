const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Route to get user profile data
router.get('/', async (req, res) => {
  const userId = req.query._id; // _id is passed in query parameters

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Fetch user data from MongoDB using findById
    const user = await User.findById(userId); // Use async/await for the MongoDB query

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send back the user profile data
    res.status(200).json({
      username: user.username,
      email: user.email,
      city: user.city,
      country: user.country,
      bio: user.bio,
      profileP
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: "Error retrieving user data." });
  }
});

module.exports = router;


