const express = require('express'); // Import express only once
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the database connection function
const userRoutes = require('./routes/userRoutes'); // Correct path to user routes
const historyRoutes = require('./routes/historyRoutes');
// Initialize express app
const app = express();

// Load environment variables
dotenv.config();
// require('dotenv').config();

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

otenv.config();

// const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes); // Add history route

// const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error(err));