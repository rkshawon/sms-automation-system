const express = require("express");
const contactRouter = express.Router();
const constactList = require("../controller/contactList");

contactRouter.post("/", constactList.createContact);
contactRouter.get("/", constactList.getAllContact);
contactRouter.get("/:id", constactList.getOneContact);
contactRouter.put("/:id", constactList.updateContact);
contactRouter.delete("/:id", constactList.deleteContact);

module.exports = contactRouter;
