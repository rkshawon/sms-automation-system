const SagementList = require("../models/SagementList");

const createSagementList = async (req, res, next) => {
  try {
    const sagementList = new SagementList(req.body);
    await sagementList.save();
    res.status(200).json({
      message: "Successfull",
    });
  } catch (err) {
    next(err);
  }
};
const getAllSagementList = async (req, res) => {
  try {
    const sagementList = await SagementList.find()
      .populate("segment")
      .populate("contact")
      .exec();
    res.status(200).json({
      message: "Successfull",
      data: sagementList,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
const getOneSagementList = async (req, res, next) => {
  try {
    const sagementList = await SagementList.findById(req.params.id)
      .populate("segment")
      .populate("contact")
      .exec();

    res.status(200).json({
      message: "Successfull",
      data: sagementList,
    });
  } catch (err) {
    next(err);
  }
};
const updateSagementList = async (req, res, next) => {
  try {
    await SagementList.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "Successfull",
    });
  } catch (err) {
    next(err);
  }
};
const deleteSagementList = async (req, res, next) => {
  try {
    await SagementList.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Successfull",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSagementList,
  getAllSagementList,
  getOneSagementList,
  updateSagementList,
  deleteSagementList,
};
