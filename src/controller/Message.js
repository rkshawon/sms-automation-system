var fs = require("fs");
const moment = require("moment");

const sendMessage = (data) => {
  const fInput = data.message + "\n";
  // fs.appendFile("message.txt", fInput, (err) => {
  //   if (err) throw err;
  // });
  console.log(data.message);
  return;
};

const delayMessage = (data) => {
  const delayTime = parseInt(data.time);
  let currentTime = moment();
  let endTime = moment().add(delayTime, "seconds");
  while (!currentTime.isSame(endTime)) {
    currentTime = moment();
  }
  console.log("Waited " + delayTime + "s");
};

const getMessage = async (req, res) => {
  try {
    const message = req.body;
    console.log("=======================");
    console.log("Starting the process...");
    console.log("-----------------------");
    await message.forEach((mgs) => {
      if (mgs.nodeType === "sendMessage") {
        sendMessage(mgs);
      } else {
        delayMessage(mgs);
      }
    });
    console.log("Process Completed Successfully");
    res.status(200).json({
      message: "Message was send",
    });
  } catch (err) {
    res.status(200).json(err);
  }
};

module.exports = { getMessage };
