const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI || "mongodb://127.0.0.1:27017/task")
    console.log("connected")
  } catch (err) {
    console.log("Error is", err);
  }
};

module.exports = connectDb;
