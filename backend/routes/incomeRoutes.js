const express = require('express');
const Income = require('../models/Income');
const router = express.Router();

// Add income
router.post('/', async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate input
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid income amount" });
    }

    const income = new Income({ amount });
    await income.save();

    res.status(201).json({ message: "Income added successfully" });
  } catch (err) {
    console.error(err); // Log the error for easier debugging
    res.status(500).json({ message: "Error saving income: " + err.message });
  }
});

// Get total income
router.get('/total', async (req, res) => {
  try {
    const totalIncome = await Income.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({ total: totalIncome[0]?.total || 0 });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: "Error calculating total income: " + err.message });
  }
});

// Simple test route
router.get('/', (req, res) => {
  res.json({ message: 'Income route' });
});

module.exports = router;
