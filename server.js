const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./router'); // Import the router module
const Person = require('./models/person');

dotenv.config();

const app = express();
const port = 3020;

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Handle connection events
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB database'));

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes defined in the separate file
app.use('/api', router); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
