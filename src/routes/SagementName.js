const express = require("express");
const sagementNameRouter = express.Router();
const sagementName = require("../controller/sagementName");

sagementNameRouter.post("/", sagementName.createSagementName);
sagementNameRouter.get("/", sagementName.getAllSagementName);
sagementNameRouter.get("/:id", sagementName.getOneSagementName);
sagementNameRouter.put("/:id", sagementName.updateSagementName);
sagementNameRouter.delete("/:id", sagementName.deleteSagementName);

module.exports = sagementNameRouter;
