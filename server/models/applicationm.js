const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  pokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon', required: true },
  status:  { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
