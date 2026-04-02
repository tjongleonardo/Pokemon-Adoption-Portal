const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const trainerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  region:   { type: String }
}, { timestamps: true });

// Pre-save hook — automatically hash password before saving
trainerSchema.pre('save', async function (next) {
  // Only hash if password was modified (or is new)
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare passwords
trainerSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Trainer', trainerSchema);
