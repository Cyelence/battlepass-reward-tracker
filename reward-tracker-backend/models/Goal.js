// models/Goal.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  milestones: [String], // Array of milestones
  reward: String,
  progress: {
    type: Number,
    default: 0, // Percentage or steps
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Goal', goalSchema);
