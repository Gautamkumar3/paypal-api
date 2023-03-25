const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: [true, "title field is required"] },
  description: {
    type: String,
    required: [true, "Please write the description"],
  },
  type: {
    type: String,
    enum: ["bug", "feature", "story"],
    required: [true, "type field is required"],
  },
  status: {
    type: String,
    enum: ["todo", "in progress", "code review", "testing", "done"],
    required: [true, "status field is required"],
    default: "todo",
  },
  sprintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sprint",
    required: true,
  },
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
