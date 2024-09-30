const express = require('express');
const router = express.Router();
const Goal = require('../models/goalModel');  // Adjusted to match your model name convention
const User = require('../models/userModel');  // Import the User model

// Get all goals
router.get('/', async (req, res) => {
    try {
        const goals = await Goal.find();
        res.json(goals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new goal
router.post('/', async (req, res) => {
    try {
        const { title, description, milestones, reward, tier, xp } = req.body;
        const goal = new Goal({ title, description, milestones, reward, tier, xp });
        await goal.save();
        res.json(goal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update progress of a goal
router.put('/:id/progress', async (req, res) => {
    try {
        const { progress } = req.body;
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });

        goal.progress = progress;
        await goal.save();
        res.json(goal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mark a goal as completed and update XP and tiers for the user
router.patch('/:id', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) return res.status(404).json({ message: 'Goal not found' });

        if (goal.isCompleted) {
            return res.status(400).json({ message: 'Goal already completed' });
        }

        // Mark goal as completed
        goal.isCompleted = true;
        await goal.save();

        // Add XP to user and check if next tier should be unlocked
        const user = await User.findById(req.body.userId);  // Ensure you pass userId in the request body
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.totalXP += goal.xp;  // Add XP for completing the goal

        // Define XP needed to reach the next tier and check for tier unlock
        const xpForNextTier = 500;
        if (user.totalXP >= xpForNextTier * user.currentTier) {
            user.currentTier += 1;  // Unlock the next tier
        }

        await user.save();

        res.json({ message: 'Goal completed!', goal, user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
