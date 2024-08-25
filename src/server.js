// src/server.js
const Hapi = require("@hapi/hapi");
const router = require("../src/api/routes");
// const authPlugin = require("./plugins/authPlugin");
const basicAuthPlugin = require("./plugins/basicAuthPlugin");

const app = Hapi.server({
  port: process.env.PORT,
  host: process.env.HOST,
  routes: {
    cors: true,
  },
  debug: {
    log: ["*"],
    request: ["*"],
  },
});

const startServer = async () => {
  try {
    await app.register(basicAuthPlugin); // Ensure authPlugin is registered

    app.route(router);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
