const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SagementListModel = new Schema(
  {
    segment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SagementName",
    },

    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContactList",
    },
  },
  { timestamps: true }
);

const SagementList = mongoose.model("SagementList", SagementListModel);
module.exports = SagementList;
