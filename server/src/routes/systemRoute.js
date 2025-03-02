const systemController = require("../controllers/systemController");
const systemRoute = require("express").Router();

systemRoute.post("/", systemController.getContentWithAi);
systemRoute.post("/save-log", systemController.saveLog);

module.exports = systemRoute;
