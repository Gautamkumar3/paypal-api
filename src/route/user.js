const express = require("express");
const { userLogin, userSignup } = require("../controller/user");

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);

module.exports = userRouter;
