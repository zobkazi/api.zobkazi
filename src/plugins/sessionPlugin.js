const Cookie = require("@hapi/cookie");

const sessionPlugin = {
  name: "sessionPlugin",
  version: "1.0.0",
  register: async (server, options) => {
    server.register(Cookie);

    server.auth.strategy("session", "cookie", {
      cookie: {
        name: "session",
        password: process.env.COOKIE_PASSWORD || "zobkazi",
        isSecure: process.env.NODE_ENV === "production",
      },
      redirectTo: "/login",
    });
    server.auth.default("session");
  },
};

module.exports = sessionPlugin;
