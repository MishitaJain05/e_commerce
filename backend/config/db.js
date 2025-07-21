const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (err) {
    console.log(`error connecting to db ${err}`);
  }
};
