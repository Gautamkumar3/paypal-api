const mongoose = require("mongoose");

const sprintSchema = new mongoose.Schema({
  title: { type: String, required: [true, "title field is required"] },
  goal: { type: String, required: [true, "Please set your sprint goal"] },
  start_date: {
    type: Date,
    required: [true, "Start date field is required"],
    validate: {
      validator: function (value) {
        return value < this.end_date;
      },
      message: "Start date must be less than end date",
    },
  },
  end_date: {
    type: Date,
    required: [true, "End date field is required"],
    validate: {
      validator: function (value) {
        return value > this.start_date;
      },
      message: "End date must be greater than start date",
    },
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Sprint = mongoose.model("sprint", sprintSchema);
module.exports = Sprint;
