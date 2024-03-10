const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
  try {

    const uri=process.env.MONGO_URI;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };


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

