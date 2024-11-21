const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId; // Get userId from the query string.
    if (!userId) {
      return res.status(400).json({ msg: "UserId query parameter is required" });
    }

    const user = await User.findById(userId).select('-password'); // Exclude password field.
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
