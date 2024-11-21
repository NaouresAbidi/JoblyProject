const express = require('express');
const User = require('../models/user');
const axios = require('axios'); // For making API requests
const router = express.Router();


// Route to get user profile data
router.get('/', async (req, res) => {
  const userId = req.query._id; // _id is passed in query parameters

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Fetch user data from MongoDB using findById
    const user = await User.findById(userId); // Use async/await for the MongoDB query

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Send back the user profile data
    res.status(200).json({
      username: user.username,
      email: user.email,
      city: user.city,
      country: user.country,
      bio: user.bio,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: "Error retrieving user data." });
  }
});

// Route to get news from the World News API
router.get('/news', async (req, res) => {
  try {
    // API endpoint
    const apiUrl = 'https://api.worldnewsapi.com/top-news';

    // Fetch the news data
    const response = await axios.get(apiUrl, {
      params: {
        'source-country': 'us', // Set the source country
        'apiKey': 'PnhaBq7kJifD4NhHP3kmJmJrusoDRcSnXBCtBFFq', // Include your API key here
        // Optionally, you can include a date parameter if needed
      }
    });

    // Check if articles exist in the response
    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ message: 'No news articles found' });
    }

    // Process and format the news data
    const news = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt,
    }));
    console.log(response.data); // Log the data received from World News API
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Failed to fetch news', error: error.message });
  }
});

module.exports = router;
