const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// MongoDB Logged_user Schema (renaming from User to Logged_user)
const LoggedUserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: String,
  city: String,
  country: String,
  bio: String,
});

// Use the existing MongoDB connection from `index.js`
const Logged_user = mongoose.model('Logged_user', LoggedUserSchema);

// Route to get logged user profile data
router.get('/', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Fetch logged user data from MongoDB
    const loggedUser = await Logged_user.findOne({ userId });

    if (!loggedUser) {
      return res.status(404).json({ message: "Logged user not found." });
    }

    res.status(200).json({
      username: loggedUser.username,
      city: loggedUser.city,
      country: loggedUser.country,
      bio: loggedUser.bio,
    });
  } catch (error) {
    console.error('Error fetching logged user profile:', error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
