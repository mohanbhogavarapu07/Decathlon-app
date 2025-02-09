const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const athleteRoutes = require('./routes/athleteRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

  
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
  mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully');
  });
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  

// Routes
app.use('/api/athletes', athleteRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));