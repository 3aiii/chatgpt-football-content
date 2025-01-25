const { Router } = require("express");
const userRoute = require("./userRoutes");
const blogRoute = require("./blogRoutes");
const categoryRoute = require("./categoryRoutes");
const dashboardRoute = require("./dashboardRoute");

const rootRouter = Router();

rootRouter.use("/user", userRoute);
rootRouter.use("/blog", blogRoute);
rootRouter.use("/category", categoryRoute);
rootRouter.use("/dashboard", dashboardRoute);

module.exports = rootRouter;
