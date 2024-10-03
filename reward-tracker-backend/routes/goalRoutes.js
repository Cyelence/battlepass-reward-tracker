// routes/goalRoutes.js
const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// GET all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find(); // Assumes `Goal` is a mongoose model
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST create a new goal
router.post('/', async (req, res) => {
  const { title, description, milestones, reward } = req.body;
  try {
    const newGoal = new Goal({ title, description, milestones, reward });
    const savedGoal = await newGoal.save();
    res.json(savedGoal);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create goal' });
  }
});

// PATCH update a goal (e.g., mark as complete)
router.patch('/:id', async (req, res) => {
  const { progress } = req.body;
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    goal.progress = progress; // Assuming goals have a progress field
    await goal.save();

    res.json(goal);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update goal' });
  }
});

module.exports = router;
