require("dotenv").config();

const config = {
  db: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase",
  },
  // Other configuration settings
};

module.exports = config;
