const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
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

