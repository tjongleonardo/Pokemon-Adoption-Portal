const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemonm');

// Get all available Pokemon
router.get('/', async (req, res) => {
  try {
    const { region, type, status } = req.query;
    const filter = {};
    
    if (region) filter.region = region;
    if (type) filter.type = { $regex: type, $options: 'i' }; // Case-insensitive partial match
    if (status) filter.status = status;
    else filter.status = 'available'; // Default to available only

    const pokemon = await Pokemon.find(filter).populate('pokecenter');
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single Pokemon by ID
router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id).populate('pokecenter');
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Pokemon (for admin/pokecenter use)
router.put('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    res.json(pokemon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
