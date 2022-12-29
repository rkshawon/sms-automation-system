const express = require("express");
const messageRouter = express.Router();
const message = require("../controller/Message");

messageRouter.post("/", message.getMessage);
module.exports = messageRouter;
