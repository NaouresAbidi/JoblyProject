// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication' }],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
    jobsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    jobsSaved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  });

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
