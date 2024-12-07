const Expense = require('../models/Expense');

const addExpense = async (req, res) => {
  try {
    const { date, category, amount, note } = req.body;
    const newExpense = new Expense({
      date,
      category,
      amount,
      note,
      user: req.user._id, // Assuming authentication is implemented
    });
    await newExpense.save();
    res.status(201).json({ message: 'Expense added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addExpense };
