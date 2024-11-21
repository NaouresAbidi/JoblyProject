const express = require('express'); 
const router = express.Router();
const User = require('../models/user');
router.get('/', async (req, res) => {
    try {
        const userId = req.body.userId; 

        const user = await User.findById(userId).select('-password'); 
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;
