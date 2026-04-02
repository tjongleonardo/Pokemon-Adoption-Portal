const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  species:    { type: String, required: true },
  type:       { type: String, required: true },
  region:     { type: String, required: true },
  level:      { type: Number, default: 5 },
  status:     { type: String, enum: ['available', 'pending', 'adopted'], default: 'available' },
  pokecenter: { type: mongoose.Schema.Types.ObjectId, ref: 'PokeCenter' },
  imageUrl:   { type: String },
  givenName:  { type: String }, // Name assigned by trainer after adoption
  adoptedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' }
}, { timestamps: true });

module.exports = mongoose.model('Pokemon', pokemonSchema);
