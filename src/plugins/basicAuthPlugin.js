const Basic = require("@hapi/basic");

const basicAuthPlugin = {
  name: "basicAuthPlugin",
  version: "1.0.0",
  register: async (server, options) => {
    await server.register(Basic);

    server.auth.strategy("basic", "basic", {
      validate: async (request, session, h) => {
        const payload = await basicAuthSchema.validateAsync(session);
        return { isValid: true, credentials: payload };
      },

      // Set default authentication strategy
      passReqToCallback: true,
    });

    server.auth.default("basic");
  },
};

module.exports = basicAuthPlugin;
