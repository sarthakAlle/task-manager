const express = require('express');
const bodyParser = require('body-parser');
const { connectDB} = require('./db');
const Task = require('./models');
const port = 5000;
const cors=require("cors")
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT generation and verification
const User = require('./UserSchema');




connectDB();
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use(express.json())

//task controllers
app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).send(newTask); // 201 Created
  } catch (error) {
    res.status(400).send(error.message); // 400 Bad Request
  }
});

app.get('/taskList', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error.message); // 500 Internal Server Error
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found'); // 404 Not Found
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message); // 500 Internal Server Error
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).send('Task not found'); // 404 Not Found
    }
    res.send(updatedTask);
  } catch (error) {
    res.status(400).send(error.message); // 400 Bad Request
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).send('Task not found'); // 404 Not Found
    }
    res.send('Task deleted');
  } catch (error) {
    res.status(500).send(error.message); // 500 Internal Server Error
  }
});

// Export the router for use in app.js

app.get('/', (req, res) => {
    res.send('Hello World!');
  });


app.put('/tasks/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // Extract "status" property

    // Validate "status" property for allowed values:
    if (status === undefined || !['completed', 'pending'].includes(status)) {
      return res.status(400).send('"status" property must be "completed" or "pending"'); // 400 Bad Request
    }

    // Convert string ID to ObjectId:
    const objectId = mongoose.Types.ObjectId(req.params.id);

    // Find and update the task:
    const updatedTask = await Task.findByIdAndUpdate(objectId, { status }, { new: true });

    if (!updatedTask) {
      return res.status(404).send('Task not found'); // 404 Not Found
    }

    res.send(updatedTask);
  } catch (error) {
    console.error(error.message);
    if (error.name === 'CastError') { // Handle invalid ObjectIds specifically
      return res.status(400).send('Invalid task ID');
    } else {
      res.status(500).send('Server Error'); // General server error
    }
  }
});

//user controllers


// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'Signup successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//login endpoint 
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

