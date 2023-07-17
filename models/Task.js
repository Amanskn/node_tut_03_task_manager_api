const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "must provide name"],
    // ===============For removing the white spaces
    trim: true,
    maxlength: [20, "Name cannot be more than 20 character======="],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task1 = mongoose.model("Task", TaskSchema);

module.exports = Task1;

// =============A simple check
// console.log(module.exports, "This is the value of module.exports");
