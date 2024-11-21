const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// nConnecti 3al Mongo
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  

}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const authRoutes = require('./routes/');
app.use('/', authRoutes);
const userHomeRoutes = require('./routes/userhome');
app.use('/userhome', userHomeRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
