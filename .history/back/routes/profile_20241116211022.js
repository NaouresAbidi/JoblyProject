const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/profile', async (req, res) => {
  try {
    const email = req.query.email; // Get the email from the query string.
    if (!email) {
      return res.status(400).json({ msg: "Email query parameter is required" });
    }

    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      username: user.username,
      email: user.email,
      country: user.country,
      city: user.city,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
