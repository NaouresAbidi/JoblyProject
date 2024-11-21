const express = require('express');
const user = require('..');
const router = express.Router();
// Route to get user profile data
router.get('/', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  // Fetch user data from the mock database
  const user = User.find((u) => u.userId === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  res.status(200).json({
    username: user.username,
    city: user.city,
    country: user.country,
    bio: user.bio,
  });
});

module.exports = router;

