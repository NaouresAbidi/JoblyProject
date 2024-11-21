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


import React from "react";
import ProfilePage from "./ProfilePage";

function App() {
  return (
    <div className="App">
      <ProfilePage />
    </div>
  );
}

export default App;

const userHomeRoutes = require('./routes/userhome');
app.use('/userhome', userHomeRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
