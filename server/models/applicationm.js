const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  pokemon: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon', required: true },
  status:  { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  message: { type: String }, // Trainer's message explaining why they want to adopt
  proposedName: { type: String, required: true }, // Name the trainer wants to give the Pokemon
  reviewMessage: { type: String }, // Admin's reason for approval/rejection
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' }, // Admin who reviewed
  reviewedAt: { type: Date } // When the review was done
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
