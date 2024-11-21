const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// MongoDB connection using the URI from .env file
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const userHomeRoutes = require('./routes/user');
app.use('/user', userHomeRoutes);

const userProfile = require('./routes/profile');
app.use('/profile', userProfile);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
