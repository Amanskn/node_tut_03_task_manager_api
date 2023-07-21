const Task = require("../models/Task");
const mongoose = require("mongoose");
const asyncWrapper = require("../middleware/async");

// ==========A simple check
// console.log("Task in controller:-", typeof Task);

//====================================== Get all the tasks from the database
module.exports.getAllTasks = asyncWrapper(async function (req, res) {
  const tasks = await Task.find().exec();
  const tasksCount = tasks.length;

  return res.status(200).json({
    tasksCount,
    tasks,
  });
});

// ==========================================Creating a  single task in the database
module.exports.createTask = asyncWrapper(async function (req, res) {
  const newTask = await Task.create(req.body);
  return res.status(201).json({
    newTask,
  });
});

// =========================Get a single task
module.exports.getSingleTask = asyncWrapper(async function (req, res) {
  const { id: taskID } = req.params;
  // ================ this conversion is necessary. Why?
  //=============  See,  Mongoose will automatically perform the conversion from string to ObjectId internally when querying the database iff the string is a valid ObjectId.

  // =================== However, if taskID is not a valid ObjectId string or you want to enforce the conversion to ensure it
  // ==================== is in the correct format, then using new mongoose.Types.ObjectId(taskID) is appropriate.

  // ==================== So, in summary, if taskID is already a valid ObjectId string, there is no need to convert it using
  // ================= new mongoose.Types.ObjectId(taskID). However, if it is not a valid ObjectId string or you want to enforce the conversion, using mongoose.Types.ObjectId can be helpful.

  const convertedTaskID = new mongoose.Types.ObjectId(taskID);

  // console.log("This is the id value received---", convertedTaskID);

  const task = await Task.findOne({ _id: convertedTaskID });
  if (!task) {
    return res.status(404).json({
      msg: `No task found with the id:- ${convertedTaskID}`,
    });
  }

  return res.status(200).json({ task });
});

// ============================Update a particular task
module.exports.updateTask = asyncWrapper(async function (req, res) {
  const { id } = req.params;
  const taskID = new mongoose.Types.ObjectId(id);
  const oldTask = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    returnOriginal: true, // or new:false
    // returnOriginal: false, // or new:true,
    // ========To enforce the validation check
    runValidators: true,
  });
  if (!oldTask) {
    return res.status(404).json({
      msg: `No task found with the id:- ${taskID}, hence no updation can be done`,
    });
  }
  return res.status(200).json({
    msg: "Task Updated successfully",
    oldTask,
  });
});

// =======================Delete a task
module.exports.deleteTask = asyncWrapper(async function (req, res) {
  const { id } = req.params;
  const taskID = new mongoose.Types.ObjectId(id);
  const deletedTask = await Task.deleteOne({ _id: taskID });
  if (deletedTask.deletedCount > 0) {
    return res.status(200).json({
      msg: `Task deleted successfully`,
    });
  } else {
    return res.status(404).json({
      msg: `No task found with the id:- ${taskID}, hence no deletion happened...`,
    });
  }
});

// console.log("========inside task controller:---", module.exports);

// console.log("Controller ran");
