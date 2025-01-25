const blogController = require("../controllers/blogController");
const uploadImage = require("../middlewares/uploadMiddleware");

const blogRoute = require("express").Router();

blogRoute.get("/gets", blogController.gets);
blogRoute.get("/recommend", blogController.recommend);
blogRoute.get("/:blogId", blogController.get);
blogRoute.post("/create", blogController.create);
blogRoute.post("/create", uploadImage, blogController.uploadImg);
blogRoute.put("/:blogId", blogController.update);
blogRoute.delete("/:blogId", blogController.delete);

module.exports = blogRoute;
