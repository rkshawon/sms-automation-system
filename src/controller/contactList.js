const ContactListModel = require("../models/ContactList");

const createContact = async (req, res, next) => {
  try {
    const contact = new ContactListModel(req.body);
    await contact.save();
    res.status(200).json({
      message: "Successfull",
    });
  } catch (err) {
    next(err);
  }
};
const getAllContact = async (req, res, next) => {
  try {
    const contact = await ContactListModel.find();
    res.status(200).json({
      message: "Successfull",
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};
const getOneContact = async (req, res, next) => {
  try {
    const contact = await ContactListModel.findById(req.params.id);
    res.status(200).json({
      message: "Successfull",
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};
const updateContact = async (req, res, next) => {
  try {
    await ContactListModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "Successfull",
    });
  } catch (err) {
    next(err);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    await ContactListModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Successfull",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createContact,
  getAllContact,
  getOneContact,
  updateContact,
  deleteContact,
};
