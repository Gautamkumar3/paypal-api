const TaskModal = require("../modal/task");

const getTask = async (req, res) => {
  const { sprintid } = req.headers;
  try {
    const Task = await TaskModal.find({ sprintId: sprintid });
    res.status(200).send({
      status: "success",
      message: "Get all task related to this sprint",
      data: Task,
    });
  } catch (er) {
    res.status(401).send({ status: "error", message: er.message });
  }
};

const addTask = async (req, res) => {
  const { title } = req.body;
  try {
    const checkTask = await TaskModal.findOne({ title });
    if (checkTask) {
      res.status(400).send({
        status: "warning",
        message: "This task is already exist create another one",
      });
    } else {
      const Task = new TaskModal({
        ...req.body,
        sprintId: req.headers.sprintid,
      });
      await Task.save();
      res.status(200).send({
        status: "success",
        message: "Task created successfully",
        data: Task,
      });
    }
  } catch (er) {
    res.status(401).send({ status: "error", message: er.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const Task = await TaskModal.findByIdAndDelete(id);
    res.status(200).send({
      status: "success",
      message: "Task deleted successfully",
      data: Task,
    });
  } catch (er) {
    res.status(401).send({ status: "error", message: er.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const Task = await TaskModal.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).send({
      status: "success",
      message: "Task updated successfully",
      data: Task,
    });
  } catch (er) {
    res.status(401).send({ status: "error", message: er.message });
  }
};

module.exports = {
  getTask,
  addTask,
  deleteTask,
  updateTask,
};
