const express = require('express');
const router = express.Router();
const Application = require('../models/applicationm');
const Pokemon = require('../models/pokemonm');

// Create a new adoption application
router.post('/', async (req, res) => {
  try {
    const { trainer, pokemon, message, proposedName } = req.body;

    // Check if Pokemon exists and is available
    const targetPokemon = await Pokemon.findById(pokemon);
    if (!targetPokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
    if (targetPokemon.status !== 'available') {
      return res.status(400).json({ message: 'Pokemon is not available for adoption' });
    }

    // Create the application
    const application = new Application({
      trainer,
      pokemon,
      message,
      proposedName,
      status: 'pending'
    });

    await application.save();

    // Update Pokemon status to pending
    targetPokemon.status = 'pending';
    await targetPokemon.save();

    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all applications (with filters)
router.get('/', async (req, res) => {
  try {
    const { trainer, status } = req.query;
    const filter = {};
    
    if (trainer) filter.trainer = trainer;
    if (status) filter.status = status;

    const applications = await Application.find(filter)
      .populate('trainer')
      .populate('pokemon')
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single application
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('trainer')
      .populate('pokemon');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update application status (approve/reject)
router.put('/:id', async (req, res) => {
  try {
    const { status, reviewMessage, reviewedBy } = req.body;
    const application = await Application.findById(req.params.id).populate('pokemon');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    
    // Add review information if provided
    if (reviewMessage) {
      application.reviewMessage = reviewMessage;
    }
    if (reviewedBy) {
      application.reviewedBy = reviewedBy;
      application.reviewedAt = new Date();
    }

    if (status === 'approved') {
      // Update Pokemon: set as adopted, assign name, and link to trainer
      const pokemon = await Pokemon.findById(application.pokemon._id);
      pokemon.status = 'adopted';
      pokemon.givenName = application.proposedName;
      pokemon.adoptedBy = application.trainer;
      await pokemon.save();
    } else if (status === 'rejected') {
      // Return Pokemon to available status
      const pokemon = await Pokemon.findById(application.pokemon._id);
      pokemon.status = 'available';
      await pokemon.save();
    }

    await application.save();
    
    // Populate for response
    await application.populate('trainer');
    await application.populate('pokemon');
    await application.populate('reviewedBy');
    
    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an application (Cancel pending or Release adopted Pokemon)
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Return Pokemon to available status regardless if pending or approved
    const pokemon = await Pokemon.findById(application.pokemon);
    if (pokemon) {
      pokemon.status = 'available';
      pokemon.givenName = undefined;
      pokemon.adoptedBy = undefined;
      await pokemon.save();
    }

    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted and Pokemon released' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
