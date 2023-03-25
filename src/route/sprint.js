const express = require("express");
const {
  getAllSprint,
  addSprint,
  updateSprint,
  deleteSprint,
} = require("../controller/sprint");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const sprintRouter = express.Router();
sprintRouter.use(AuthMiddleware);

sprintRouter.get("/", getAllSprint);
sprintRouter.post("/", addSprint);
sprintRouter.patch("/:id", updateSprint);
sprintRouter.delete("/:id", deleteSprint);

module.exports = sprintRouter;
