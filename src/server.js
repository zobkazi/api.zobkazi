const Hapi = require("@hapi/hapi");
const router = require("../src/api/routes");

const app = Hapi.server({
  port: 3000,
  host: "localhost",
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
