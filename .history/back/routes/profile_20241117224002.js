const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');
const path = require('path');



// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); // Ensure correct path to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Endpoint to update profile picture
router.put('/profile-picture', upload.single('profilePicture'), async (req, res) => {
  try {
    const { _id } = req.body; // User ID from the request body

    if (!_id || !req.file) {
      return res.status(400).json({ msg: 'User ID and profile picture are required' });
    }

    // Update user document with the profile picture filename
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { profilePicture: req.file.filename },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'Profile picture updated successfully', updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Serve static files from 'uploads' folder
router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

router.get('/', async (req, res) => {
  try {
    const userId = req.query._id;
    if (!userId) {
      return res.status(400).json({ msg: "UserId query parameter is required" });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      username: user.username,
      BI
      email: user.email,
      country: user.country,
      city: user.city,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
// Update user profile
router.put('/', async (req, res) => {
  try {
    const { _id, username, bio, country, city } = req.body;

    if (!_id) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    // Find the user and update their details
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { username, bio, country, city },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
