const express = require('express');
const User = require('../models/user');
const router = express.Router();
// Route to get user profile data
router.get('/', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  // Fetch user data from the mock database
  const user = User.find((u) => u._id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.status(200).json({
    username: user.username,
    city: user.city,
    country: user.country,
  });
});

module.exports = router;

