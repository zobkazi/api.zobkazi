const mongoose = require("mongoose");
const config = require("../config/config");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.db.uri);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
