const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactListModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    // sagementList: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "SagementList",
    //   },
    // ],
  },
  { timestamps: true }
);

const ContactList = mongoose.model("ContactList", contactListModel);
module.exports = ContactList;
