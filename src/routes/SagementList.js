const express = require("express");
const sagementListRouter = express.Router();
const sagementList = require("../controller/sagementList");

sagementListRouter.post("/", sagementList.createSagementList);
sagementListRouter.get("/", sagementList.getAllSagementList);
sagementListRouter.get("/:id", sagementList.getOneSagementList);
sagementListRouter.put("/:id", sagementList.updateSagementList);
sagementListRouter.delete("/:id", sagementList.deleteSagementList);

module.exports = sagementListRouter;
