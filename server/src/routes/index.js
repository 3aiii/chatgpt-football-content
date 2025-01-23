const { Router } = require("express");
const userRoute = require("./userRoutes");
const blogRoute = require("./blogRoutes");
const categoryRoute = require("./categoryRoutes");

const rootRouter = Router();

rootRouter.use("/user", userRoute);
rootRouter.use("/blog", blogRoute);
rootRouter.use("/category", categoryRoute);

module.exports = rootRouter;