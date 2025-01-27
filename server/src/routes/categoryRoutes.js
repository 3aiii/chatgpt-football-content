const categoryController = require("../controllers/categoryController");
const { verifyAdmin } = require("../middlewares/verificationMiddleware");

const categoryRoute = require("express").Router();

categoryRoute.get("/gets", categoryController.gets);
categoryRoute.get("/:cateName", categoryController.get);
categoryRoute.post("/create", verifyAdmin, categoryController.create);
categoryRoute.put("/:cateId", verifyAdmin, categoryController.update);
categoryRoute.delete("/:cateId", verifyAdmin, categoryController.delete);

module.exports = categoryRoute;
