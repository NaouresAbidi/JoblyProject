const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://NaouresAbidi:123123Nn!@joblydb.fvuuv.mongodb.net/?retryWrites=true&w=majority&appName=JoblyDB", {
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

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send(/auth/login');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

