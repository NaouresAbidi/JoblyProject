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
    const apiToken = 'PnhaBq7kJifD4NhHP3kmJmJrusoDRcSnXBCtBFFq'; // Use your actual API token
    const categories = 'business,tech'; // Categories you want
    const search = 'apple'; // Search term
    const limit = 50; // Limit number of news articles
    
    // Encode the parameters
    const esc = encodeURIComponent;
    const query = Object.keys({ api_token: apiToken, categories, search, limit })
      .map(k => esc(k) + '=' + esc({ api_token: apiToken, categories, search, limit }[k]))
      .join('&');
    
    // Fetch news from the API
    const response = await axios.get(`https://api.thenewsapi.com/v1/news/all?${query}`);
    
    // Check if articles are available
    if (!response.data.articles || response.data.articles.length === 0) {
      return res.status(404).json({ message: 'No news articles found' });
    }

    const news = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt,
    }));
    
    res.status(200).json(news); // Send the news data back to the frontend
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ message: 'Failed to fetch news', error: error.message });
  }
});



module.exports = router;
