const userRoute = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyUser,
  verifyAdmin,
} = require("../middlewares/verificationMiddleware");

userRoute.get("/gets", verifyAdmin, userController.gets);
userRoute.get("/:userId", verifyUser, userController.get);
userRoute.post("/logout/:userId", verifyUser, userController.logout);
userRoute.post("/login", userController.login);
userRoute.post("/register", userController.create);
userRoute.delete("/:userId", verifyAdmin, userController.delete);
userRoute.put("/:userId", [verifyUser, verifyAdmin], userController.update);

module.exports = userRoute;
