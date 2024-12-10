const express = require('express'); // Import express only once
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the database connection function
const userRoutes = require('./routes/userRoutes'); // Correct path to user routes

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);

// Routes (make sure income and expense routes are correct)
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

// Use routes
app.use('/api/income', incomeRoutes);
app.use('/api/expenses', expenseRoutes);

// Connect to MongoDB
connectDB(); // Establish MongoDB connection

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);
