const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Trainer = require('../models/trainerm');

// ──────────────────────────────────────────────
//  Helper: verify JWT token from Authorization header
// ──────────────────────────────────────────────
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided. Please log in.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// ──────────────────────────────────────────────
//  Helper: require admin role
// ──────────────────────────────────────────────
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

// ──────────────────────────────────────────────
//  POST /api/trainers/register
//  Public – create a new trainer account
// ──────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, region } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

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

    // Password is hashed automatically by the pre-save hook in trainerm.js
    const trainer = new Trainer({
      username,
      email,
      password,
      region,
      role: 'user'
    });

    await trainer.save();

    // Return a token so the user is logged-in immediately after registration
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

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const trainer = await Trainer.findOne({ username });
    if (!trainer) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await trainer.comparePassword(password);
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
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const trainers = await Trainer.find().select('-password');
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ──────────────────────────────────────────────
//  GET /api/trainers/:id
//  Authenticated – get a single trainer by ID
// ──────────────────────────────────────────────
router.get('/:id', authenticate, async (req, res) => {
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
//  Owner or Admin – update a trainer
// ──────────────────────────────────────────────
router.put('/:id', authenticate, async (req, res) => {
  try {
    // Only the owner or an admin can update
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this trainer' });
    }

    const { username, email, region, role } = req.body;
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (region) updateData.region = region;
    // Only admins can change roles
    if (role && req.user.role === 'admin') updateData.role = role;

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
//  Admin only – delete a trainer
// ──────────────────────────────────────────────
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
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
