const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Trainer = require('../models/trainerm');

// ──────────────────────────────────────────────
//  POST /api/trainers/register
//  Public – create a new trainer account
// ──────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, region } = req.body;

    // Check for duplicate username
    const existingUser = await Trainer.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Check for duplicate email
    const existingEmail = await Trainer.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const trainer = new Trainer({
      username,
      email,
      password: hashedPassword,
      region,
      role: 'user'
    });

    await trainer.save();

    // Return a token so the user is logged‑in immediately after registration
    const token = jwt.sign(
      { id: trainer._id, role: trainer.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      trainer: {
        id: trainer._id,
        username: trainer.username,
        email: trainer.email,
        role: trainer.role,
        region: trainer.region
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ──────────────────────────────────────────────
//  POST /api/trainers/login
//  Public – authenticate & return JWT
// ──────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const trainer = await Trainer.findOne({ username });
    if (!trainer) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, trainer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: trainer._id, role: trainer.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      trainer: {
        id: trainer._id,
        username: trainer.username,
        email: trainer.email,
        role: trainer.role,
        region: trainer.region
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ──────────────────────────────────────────────
//  GET /api/trainers/
//  Admin only – list all trainers
// ──────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const trainers = await Trainer.find().select('-password');
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ──────────────────────────────────────────────
//  GET /api/trainers/:id
//  Get a single trainer by ID
// ──────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id).select('-password');
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ──────────────────────────────────────────────
//  PUT /api/trainers/:id
//  Update a trainer (owner or admin)
// ──────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const { username, email, region, role } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (region) updateData.region = region;
    if (role) updateData.role = role;

    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ──────────────────────────────────────────────
//  DELETE /api/trainers/:id
//  Delete a trainer (admin only)
// ──────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.json({ message: 'Trainer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
