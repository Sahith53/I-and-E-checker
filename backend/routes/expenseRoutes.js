const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add expense
router.post('/', async (req, res) => {
  try {
    const { date, category, amount, note } = req.body;
    const expense = new Expense({ date, category, amount, note });
    await expense.save();
    res.json({ message: "Expense added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get total expenses
router.get('/total', async (req, res) => {
  try {
    const totalExpenses = await Expense.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    res.json({ total: totalExpenses[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
