const express = require("express");
const routes = express.Router();
const wordController = require("../controller/words");

routes.get("/:userId", wordController.getWords);
routes.post("/:userId/check", wordController.checkWord);
routes.get("/:userId/hint", wordController.getHint);
// routes.get("/:userId", userController.getUser);
// routes.put("/:userId", userController.updateUser);

exports.routes = routes;
