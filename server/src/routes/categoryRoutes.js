const categoryController = require("../controllers/categoryController");
const {
  verifyAdmin,
  verifyUser,
} = require("../middlewares/verificationMiddleware");

const categoryRoute = require("express").Router();

categoryRoute.get("/gets", [verifyUser, verifyAdmin], categoryController.gets);
categoryRoute.get("/:cateId", verifyAdmin, categoryController.get);
categoryRoute.post("/create", verifyAdmin, categoryController.create);
categoryRoute.put("/:cateId", verifyAdmin, categoryController.update);
categoryRoute.delete("/:cateId", verifyAdmin, categoryController.delete);

module.exports = categoryRoute;
