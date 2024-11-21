const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// MongoDB User Schema (defined in this file or imported if defined elsewhere)
const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: String,
  city: String,
  country: String,
  bio: String,
});

// Use the existing MongoDB connection from `index.js`
const LoggedUser = mongoose.model('loggedUser', UserSchema);

// Route to get user profile data
router.get('/', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Fetch user data from MongoDB
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      username: user.username,
      city: user.city,
      country: user.country,
      bio: user.bio,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
