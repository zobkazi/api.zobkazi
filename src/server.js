const Hapi = require("@hapi/hapi");
const router = require("../src/api/routes");

const app = Hapi.server({
  port: process.env.PORT,
  host: process.env.HOST,
  routes: {
    cors: true,
  },
  debug: {
    request: ["error"],
  },
});

app.route(router);

app.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return "Hello, Hapi!";
  },
});

module.exports = app;
