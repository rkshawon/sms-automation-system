const express = require("express");
const Route = express.Router();
const contactRouter = require("./ContactList");
const sagementNameRouter = require("./SagementName");
const sagementListRouter = require("./SagementList");
const messageRouter = require("./Message");

Route.use("/contacts", contactRouter);
Route.use("/segment", sagementNameRouter);
Route.use("/segment-list", sagementListRouter);
Route.use("/message", messageRouter);

module.exports = Route;
