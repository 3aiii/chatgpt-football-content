const blogController = require("../controllers/blogController");
const uploadImage = require("../middlewares/uploadMiddleware");
const {
  verifyAdmin,
  verifyUser,
} = require("../middlewares/verificationMiddleware");

const blogRoute = require("express").Router();

blogRoute.get("/gets", blogController.gets);
blogRoute.get("/recommend", blogController.recommend);
blogRoute.get("/comment/:blogId", blogController.getComment);
blogRoute.get("/:blogId", blogController.get);
blogRoute.post("/create", blogController.create);
blogRoute.post("/rating/:blogId", verifyUser, blogController.createRating);
blogRoute.post("/createComment/:blogId", blogController.createComment);
blogRoute.post(
  "/uploadImage/:blogId",
  [verifyUser, verifyAdmin],
  uploadImage,
  blogController.uploadImg
);
blogRoute.put("/:blogId", verifyAdmin, blogController.update);
blogRoute.put("/rating/:blogId", verifyUser, blogController.removeRating);
blogRoute.delete("/:blogId", verifyAdmin, blogController.delete);

module.exports = blogRoute;
