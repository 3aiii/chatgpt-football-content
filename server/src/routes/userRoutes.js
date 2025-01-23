const userRoute = require("express").Router();
const userController = require("../controllers/userController");

userRoute.get("/login", userController.login);
userRoute.post("/register", userController.create);

module.exports = userRoute;
