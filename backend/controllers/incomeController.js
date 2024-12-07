const Income = require('../models/Income');

const addIncome = async (req, res) => {
  try {
    const { amount } = req.body;
    const newIncome = new Income({
      amount,
      user: req.user._id, // Assuming authentication is implemented
    });
    await newIncome.save();
    res.status(201).json({ message: 'Income added successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addIncome };
