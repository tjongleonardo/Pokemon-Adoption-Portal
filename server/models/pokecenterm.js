const mongoose = require('mongoose');

const pokecenterSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  location:     { type: String, required: true },
  contactEmail: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PokeCenter', pokecenterSchema);
