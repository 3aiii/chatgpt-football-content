const systemController = require("../controllers/systemController");
const systemRoute = require("express").Router();

systemRoute.post("/", systemController.getContentWithAi);

module.exports = systemRoute;
