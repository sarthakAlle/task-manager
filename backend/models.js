const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:"User",// Assuming user IDs are MongoDB ObjectIDs
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  due_date:{ type:Date, required :true},
  status: {
    type: String,
    default:"pending",
    enum: ['completed', 'pending'], // Enforce enum values
  }
});

const Task =mongoose.model('Task', TaskSchema);

// Export the Task model
module.exports = Task;

