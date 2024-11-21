<<<<<<< Tabnine <<<<<<<
const express = require('express');//-
const mongoose = require('mongoose');//-
const cors = require('cors');//-
require('dotenv').config();//-
//-
const app = express();//-
const port = process.env.PORT || 3000;//-
//-
app.use(express.json());//-
app.use(cors());//-
// nConnecti 3al Mongo//-
mongoose.connect(process.env.MONGODB_URI, {//-
  useNewUrlParser: true,//-
  useUnifiedTopology: true,//-
//-
//-
}).then(() => {//-
  console.log('Connected to MongoDB');//-
}).catch((error) => {//-
  console.error('MongoDB connection error:', error);//-
});//-
//-
//-
const authRoutes = require('./routes/auth');//-
app.use('/auth', authRoutes);//-
const defaultroute = require('./routes/');//-
app.use('/login', defaultroute);//-
const userHomeRoutes = require('./routes/userhome');//-
app.use('/userhome', userHomeRoutes);//-
/**//+
 * Starts the server and listens for incoming connections.//+
 *//+
 * @param {number} port - The port number on which the server should listen.//+
 * @param {function} callback - A function to be called when the server starts listening.//+
 *//+
 * @returns {undefined} This function does not return a value.//+
 *///+
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
>>>>>>> Tabnine >>>>>>>// {"conversationId":"a8959a49-fba1-441d-87ab-3fbb9c0c850b","source":"instruct"}
