// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, candidatePassword, country,city,zipCode,birthday,userType} = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newUser = new User({ username, email, password,candidatePassword, country,city,zipCode,birthday,userType});
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
<<<<<<< Tabnine <<<<<<<
/**//+
 * Handles user sign-in process.//+
 * //+
 * @param {Object} req - Express request object.//+
 * @param {Object} req.body - The request body.//+
 * @param {string} req.body.email - The user's email address.//+
 * @param {string} req.body.password - The user's password.//+
 * @param {Object} res - Express response object.//+
 * @returns {Object} JSON response with user ID if successful, or error message.//+
 *///+
router.post('/signin', async (req, res) => {//+
  try {//+
    const { email, password } = req.body;//+
//+
    // Find user by email//+
    const user = await User.findOne({ email });//+
    if (!user) return res.status(404).json({ message: 'User not found' });//+
//+
    // Check if password is correct//+
    const isPasswordValid = await user.comparePassword(password);//+
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });//+
//+
    res.status(200).json({ userId: user._id });//+
  } catch (error) {//+
    res.status(500).json({ error: error.message });//+
  }//+
});//+
>>>>>>> Tabnine >>>>>>>// {"conversationId":"c27afc74-6648-4887-a6a4-08dfc5dccbf3","source":"instruct"}

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

    res.status(200).json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
