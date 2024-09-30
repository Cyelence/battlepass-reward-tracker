// models/Goal.js
const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    milestones: [{ 
        title: { type: String, required: true }, 
        completed: { type: Boolean, default: false } 
    }],
    reward: { type: String }, // URL to animation or description
    progress: { type: Number, default: 0 } // Progress percentage
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
