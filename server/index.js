const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const trainerRoutes = require('./routes/trainerr');
const pokemonRoutes = require('./routes/pokemonr');
const pokecenterRoutes = require('./routes/pokecenterr');
const applicationRoutes = require('./routes/applicationr');

app.use('/api/trainers', trainerRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/pokecenters', pokecenterRoutes);
app.use('/api/applications', applicationRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5001, () => {
      console.log('Server running on port', process.env.PORT || 5001);
    });
  })
  .catch(err => console.error(err));
