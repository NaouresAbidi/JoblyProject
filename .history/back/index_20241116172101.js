// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const userHomeRoutes = require('./routes/userhome');
app.use('/userhome', userHomeRoutes);

// Main route: Redirect to the React app or serve a message
app.get('/', (req, res) => {
  // Replace 'http://localhost:3000/login' with your actual React app login URL
  res.redirect('http://localhost:3000/login'); // Adjust this URL as needed
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
