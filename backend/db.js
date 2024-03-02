const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    const uri = "mongodb://localhost:27017/task_manager"; // Replace with your actual connection string

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add additional options here if needed (e.g., auth information)
    };

    // Enable logging for connection events
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error.message);
      process.exit(1); // Exit on connection error
    });

    mongoose.connection.on('open', () => {
      console.log('MongoDB connected successfully');
    });

    await mongoose.connect(uri, options);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit on connection error
  }
};


module.exports = { connectDB }; // Export both connectDB and Task

