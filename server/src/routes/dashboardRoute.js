const dashboardController = require("../controllers/dashboardController");
const { verifyAdmin } = require("../middlewares/verificationMiddleware");

const dashboardRoute = require("express").Router();

dashboardRoute.get("/sum-of-data", verifyAdmin, dashboardController.SumOfData);
dashboardRoute.get(
  "/user-log-data",
  verifyAdmin,
  dashboardController.UserLogData
);

module.exports = dashboardRoute;
