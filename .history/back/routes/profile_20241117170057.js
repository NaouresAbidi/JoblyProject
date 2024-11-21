const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const userId = req.query._id;
    if (!userId) {
      return res.status(400).json({ msg: "UserId query parameter is required" });
    }

    const user = await User.findById(userId).select('-password');
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
// Update user profile
router.put('/', async (req, res) => {
  try {
    const { _id, username, bio, country, city } = req.body;

    if (!_id) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    // Find the user and update their details
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { username, bio, country, city },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});
<<<<<<< Tabnine <<<<<<<
/**//+
 * Retrieves a user's profile information based on the provided user ID.//+
 *//+
 * @param {Object} req - The request object containing the user ID in the query parameters.//+
 * @param {Object} res - The response object to send the API response.//+
 *//+
 * @returns {void}//+
 *///+
router.get('/', async (req, res) => {//+
  try {//+
    const userId = req.query._id;//+
    if (!userId) {//+
      return res.status(400).json({ msg: "UserId query parameter is required" });//+
    }//+
//+
    const user = await User.findById(userId).select('-password');//+
    if (!user) {//+
      return res.status(404).json({ msg: 'User not found' });//+
    }//+
//+
    res.json({//+
      username: user.username,//+
      email: user.email,//+
      country: user.country,//+
      city: user.city,//+
    });//+
  } catch (error) {//+
    console.error(error.message);//+
    res.status(500).send('Server error');//+
  }//+
});//+
>>>>>>> Tabnine >>>>>>>// {"conversationId":"013964e7-c936-43ea-a585-1f4c0a44f768","source":"instruct"}

module.exports = router;
