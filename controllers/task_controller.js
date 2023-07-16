//====================================== Get all the tasks from the database
module.exports.getAllTasks = function (req, res) {
  return res.send("Get All tasks");
};

// ==========================================Creating a  single task in the database
module.exports.createTask = function (req, res) {
  return res.send("Create a task");
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
