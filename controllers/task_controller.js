const Task = require("../models/Task");
// ==========A simple check
// console.log("Task in controller:-", typeof Task);

//====================================== Get all the tasks from the database
module.exports.getAllTasks = async function (req, res) {
  try {
    const tasks = await Task.find().exec();
    const tasksCount = tasks.length;
    return res.status(200).json({
      tasksCount,
      tasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

// ==========================================Creating a  single task in the database
module.exports.createTask = async function (req, res) {
  try {
    const newTask = await Task.create(req.body);
    return res.status(201).json({
      newTask,
    });
  } catch (error) {
    console.log("first", error);

    return res.status(500).json({
      error,
    });
  }
};

// =========================Get a single task
module.exports.getSingleTask = function (req, res) {
  return res.send(`Get single task ${req.params.id}`);
};

// ============================Update a particular task
module.exports.updateTask = function (req, res) {
  return res.send("update a single task");
};

// =======================Delete a task
module.exports.deleteTask = function (req, res) {
  return res.send("Delete task " + req.params.id);
};

// console.log("========inside task controller:---", module.exports);

// console.log("Controller ran");
