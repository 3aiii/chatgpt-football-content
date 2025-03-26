const userRoute = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyUser,
  verifyAdmin,
} = require("../middlewares/verificationMiddleware");

userRoute.get("/gets", verifyAdmin, userController.gets);
userRoute.get("/:userId", userController.get);
userRoute.post("/logout/:userId", verifyUser, userController.logout);
userRoute.post("/login", userController.login);
userRoute.post("/register", userController.create);
userRoute.put("/:userId", verifyUser, userController.update);
userRoute.delete("/:userId", verifyAdmin, userController.delete);

module.exports = userRoute;
