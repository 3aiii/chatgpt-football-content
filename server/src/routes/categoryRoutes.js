const categoryRoute = require("express").Router();

categoryRoute.get("/gets");
categoryRoute.get("/:id");
categoryRoute.post("/create");
categoryRoute.put("/:cateId");
categoryRoute.delete("/:cateId");

module.exports = categoryRoute;
