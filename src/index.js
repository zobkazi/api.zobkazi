// src/index.js

const connectToDatabase = require("./utils/db_connection");
const app = require("./server");

const init_app = async () => {
  try {
    await connectToDatabase();
    app.start();
    console.log(`Server running at: ${app.info.uri}`);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
init_app();
