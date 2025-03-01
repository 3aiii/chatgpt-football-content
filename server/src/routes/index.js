const { Router } = require("express");
const userRoute = require("./userRoutes");
const blogRoute = require("./blogRoutes");
const categoryRoute = require("./categoryRoutes");
const dashboardRoute = require("./dashboardRoute");
const systemRoute = require("./systemRoute");

const rootRouter = Router();

rootRouter.use("/user", userRoute);
rootRouter.use("/blog", blogRoute);
rootRouter.use("/category", categoryRoute);
rootRouter.use("/dashboard", dashboardRoute);
rootRouter.use("/system", systemRoute);

module.exports = rootRouter;
