const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  species:    { type: String, required: true },
  type:       { type: String, required: true },
  level:      { type: Number, default: 1 },
  status:     { type: String, enum: ['available', 'pending', 'adopted'], default: 'available' },
  pokecenter: { type: mongoose.Schema.Types.ObjectId, ref: 'PokeCenter' },
  imageUrl:   { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Pokemon', pokemonSchema);
