const blogRoute = require("express").Router();

blogRoute.get("/");
blogRoute.get("/:id");

module.exports = blogRoute;
