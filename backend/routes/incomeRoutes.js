const express = require('express');
const router = express.Router();
const Income = require('../models/Income');

// Add income
router.post('/', async (req, res) => {
  try {
    const { amount } = req.body;
    const income = new Income({ amount });
    await income.save();
    res.json({ message: "Income added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get total income
router.get('/total', async (req, res) => {
  try {
    const totalIncome = await Income.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    res.json({ total: totalIncome[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
