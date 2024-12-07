const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to user model for authentication
    required: true,
  },
}, { timestamps: true });

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
