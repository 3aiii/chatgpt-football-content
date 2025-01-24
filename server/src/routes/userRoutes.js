const userRoute = require("express").Router();
const userController = require("../controllers/userController");

userRoute.get("/gets", userController.gets);
userRoute.get("/:userId", userController.get);
userRoute.post("/login", userController.login);
userRoute.post("/logout/:userId", userController.logout);
userRoute.post("/register", userController.create);
userRoute.delete("/:userId", userController.delete);
userRoute.put("/:userId", userController.update);

module.exports = userRoute;
