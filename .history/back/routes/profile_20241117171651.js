const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const User = require('../models/user');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Folder to store uploaded images
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
