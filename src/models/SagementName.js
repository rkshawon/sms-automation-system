const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SagementNameModel = new Schema(
  {
    name: {
      type: String,
      required: true,
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

const SagementName = mongoose.model("SagementName", SagementNameModel);
module.exports = SagementName;
