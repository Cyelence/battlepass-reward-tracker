const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalXP: {  // Total XP collected
    type: Number,
    default: 0,
  },
  currentTier: {  // Current battle pass tier level
    type: Number,
    default: 1,
  },
  goalsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }],
});

module.exports = mongoose.model('User', userSchema);
