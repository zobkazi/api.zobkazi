// src/server.js
const Hapi = require("@hapi/hapi");
const router = require("../src/api/routes");
const basicAuthPlugin = require("./plugins/basicAuthPlugin");
const sessionPlugin = require("./plugins/sessionPlugin");

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
    await app.register(basicAuthPlugin);
    await app.register(sessionPlugin);

    app.route(router);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();

module.exports = app;
