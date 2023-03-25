const express = require("express");
const {
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controller/task");

const taskRouter = express.Router();

taskRouter.get("/", getTask);
taskRouter.post("/", addTask);
taskRouter.patch("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);

module.exports = taskRouter;
