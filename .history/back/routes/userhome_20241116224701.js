const express = require('express');
const router = express.Router();

// Mock database for demonstration purposes
const mockDatabase = {
  users: [
    {
      userId: "1",
      username: "John Doe",
      city: "New York",
      country: "USA",
      bio: "A passionate developer and AWS certified professional.",
    },
    {
      userId: "2",
      username: "Jane Smith",
      city: "Los Angeles",
      country: "USA",
      bio: "Graphic designer and creative thinker.",
    },
  ],
};

// Route to get user profile data
router.get('/ade', (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  // Fetch user data from the mock database
  const user = mockDatabase.users.find((u) => u.userId === userId);

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

