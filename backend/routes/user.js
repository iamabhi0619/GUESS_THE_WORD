const express = require("express");
const routes = express.Router();
const userController = require("../controller/user");

routes.post("/", userController.createUser);
routes.get("/:userId", userController.getUser);
routes.put("/:userId", userController.updateUser);
routes.get("/:userId/score", userController.getScore);
routes.get("/:userId/history", userController.getHistory);

exports.routes = routes;
