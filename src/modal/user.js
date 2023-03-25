const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: [true, "This email is already in use"],
    validate: [validator.isEmail, "Please enter valid email address"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
