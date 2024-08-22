require("dotenv").config();

const config = {
  db: {
    uri: process.env.MONGO_URI || "",
  },
  // Other configuration settings
};

module.exports = config;
