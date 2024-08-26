const Cookie = require("@hapi/cookie");

const sessionPlugin = {
  name: "sessionPlugin",
  version: "1.0.0",
  register: async (server, options) => {
    await server.register(Cookie);

    server.auth.strategy("session", "cookie", {
      cookie: {
        name: "sessionId",
        password:
          process.env.COOKIE_PASSWORD ||
          "a-very-long-and-secure-password-that-is-at-least-32-characters", // Ensure this is at least 32 characters
        isSecure: process.env.NODE_ENV === "production", // Use secure cookies in production
        isHttpOnly: true, // Prevent JavaScript access to cookies
        isSameSite: "Strict", // Control when cookies are sent
      },
      redirectTo: "/login", // Redirect path if not authenticated
    });

    server.auth.default("session");
  },
};

module.exports = sessionPlugin;
