const express = require('express');
const router = express.Router();

// Route to get user home data (e.g., user profile and post info)
router.get('/', (req, res) => {
  const userData = {
    username: "User Name",
    bio: "User Bio",
    posts: [
      { id: 1, content: "Exciting News! I earned my AWS certification!" },
      // More posts or other data here
    ]
  };

  res.status(200).json(userData);
});

module.exports = router;
