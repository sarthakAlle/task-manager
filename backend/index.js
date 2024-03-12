const express = require('express');
const bodyParser = require('body-parser');
const { connectDB} = require('./db');
const Task = require('./models');
const cors=require('cors')
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt'); // For password hashing
const argon2 = require('argon2');
const jwt = require('jsonwebtoken'); // For JWT generation and verification
const User = require('./UserSchema');
const {isAuth}=require('./middleware/authMiddleware');
require('dotenv').config();
const port = process.env.PORT || 5000; 
const app = express();

connectDB();
/*
const corsConfig={
  origin:"*",
  credential:true,
  optionSuccessStatus:200,
};*/
// Use cors middleware to handle CORS headers

//app.options("",cors(corsConfig));

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

//task controllers
/*
app.post('/tasks',isAuth, async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).send(newTask); // 201 Created
  } catch (error) {
    res.status(400).send(error.message); // 400 Bad Request
  }
});
*/
app.get('/userprofile', isAuth, async (req, res) => {
  try {
    // req.user is set by the isAuth middleware
    const userId = req.user;
  //console.log(userId);
    
    // Fetch user data from the database
    /*
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
*/
    // Send user data to the frontend
    res.json(userId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/tasks', isAuth, async (req, res) => {
  try {
  
    const { title, description, due_date } = req.body;
    const newTask = new Task({
      userId: req.user.userId,
      title,
      description,
      due_date,
    });

    await newTask.save();
    res.status(201).send(newTask); // 201 Created
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message); // 400 Bad Request
  }
});


app.get('/taskList', isAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.per_page) || 10; // Default to 10 items per page

    const totalTasks = await Task.countDocuments({ userId: req.user.userId });
    const totalPages = Math.ceil(totalTasks / perPage);

    const tasks = await Task.find({ userId: req.user.userId })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.send({
      tasks,
      page,
      per_page: perPage,
      total: totalTasks,
      total_pages: totalPages,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/tasks/:id',isAuth, async (req, res) => {
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

app.put('/tasks/:id',isAuth, async (req, res) => {
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

app.delete('/tasks/:id',isAuth, async (req, res) => {
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


app.put('/tasks/:id/status',isAuth, async (req, res) => {
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

/*
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Create a new user with a unique userId
    const newUser = new User({
      userId: new mongoose.Types.ObjectId(), // Use the new keyword here
      username,
      email,
      password: await bcrypt.hash(password, 10), // Hash the password
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
    const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
*/

// Signup
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Create a new user with a unique userId
    const hashedPassword = await argon2.hash(password); // Hash the password using Argon2
    const newUser = new User({
      userId: new mongoose.Types.ObjectId(),
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

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Compare the provided password with the hashed password in the database using Argon2
    const passwordMatch = await argon2.verify(user.password, password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

