const SagementNameModel = require("../models/SagementName");

const createSagementName = async (req, res, next) => {
  try {
    const sagementName = new SagementNameModel(req.body);
    await sagementName.save();
    res.status(200).json({
      message: "Successfull",
    });
  } catch (err) {
    next(err);
  }
};
const getAllSagementName = async (req, res, next) => {
  try {
    const sagementName = await SagementNameModel.find();
    res.status(200).json({
      message: "Successfull",
      data: sagementName,
    });
  } catch (err) {
    next(err);
  }
};
const getOneSagementName = async (req, res, next) => {
  try {
    const sagementName = await SagementNameModel.findById(req.params.id);
    res.status(200).json({
      message: "Successfull",
      data: sagementName,
    });
  } catch (err) {
    next(err);
  }
};
const updateSagementName = async (req, res, next) => {
  try {
    await SagementNameModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "Successfull",
    });
  } catch (err) {
    next(err);
  }
};
const deleteSagementName = async (req, res, next) => {
  try {
    await SagementNameModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Successfull",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSagementName,
  getAllSagementName,
  getOneSagementName,
  updateSagementName,
  deleteSagementName,
};
