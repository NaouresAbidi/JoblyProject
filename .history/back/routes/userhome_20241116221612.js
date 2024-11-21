const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// MongoDB User Schema (replace with your actual schema)
const UserSchema = new mongoose.Schema({
  userId: String,
  username: String,
  city: String,
  country: String,
  bio: String,
});

const User = mongoose.model('User', UserSchema);

// MongoDB Connection (update URI as per your setup)
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route to get user profile data
router.get('/', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Fetch user data from MongoDB
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      username: user.username,
      city: user.city,
      country: user.country,
      bio: user.bio,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;