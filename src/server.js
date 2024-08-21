const Hapi = require("@hapi/hapi");
const router = require("../src/api/routes");

const app = Hapi.server({
  port: 3000,
  host: "localhost",
});

app.route(router);

app.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return "Hello, Hapi!";
  },
});

app.start();

module.exports = app;
