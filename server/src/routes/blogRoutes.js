const blogRoute = require("express").Router();

blogRoute.get("/gets");
blogRoute.get("/recommend");
blogRoute.get("/:id");
blogRoute.post("/create");
blogRoute.put("/:blogId");
blogRoute.delete("/:blogId");

module.exports = blogRoute;
