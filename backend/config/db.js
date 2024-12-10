const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Mongo URI from the .env file
    await mongoose.connect(mongoURI); // Simplified connection
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if there's an error connecting to the DB
  }
};

module.exports = connectDB;
