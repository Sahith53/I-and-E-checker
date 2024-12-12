const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Define schema for Income/Expense
const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const History = mongoose.model('History', historySchema);

// Add new income/expense
router.post(
  '/',
  [
    body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { type, amount, description } = req.body;
      const userId = req.userId; // Assuming `userId` is set by an authentication middleware

      const newEntry = new History({ userId, type, amount, description });
      await newEntry.save();

      res.status(201).json({ message: 'Entry added successfully', data: newEntry });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding entry', error: err.message });
    }
  }
);

// Get history for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.userId; // Assuming `userId` is set by an authentication middleware
    const history = await History.find({ userId }).sort({ date: -1 }); // Sort by latest date
    res.status(200).json({ data: history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching history', error: err.message });
  }
});

module.exports = router;
