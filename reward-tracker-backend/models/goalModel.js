const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  xp: {  // XP rewarded for completing the goal
    type: Number,
    default: 100,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  tier: {  // Tier or level where this goal is unlocked
    type: Number,
    required: true,
  },
  reward: {
    type: String,
    required: true,
  },
  unlockDate: {
    type: Date,
    default: null,
  }
});

module.exports = mongoose.model('Goal', goalSchema);
