// src/plugins/auth.plugin.js
const Jwt = require('@hapi/jwt');

const authPlugin = {
  name: 'authPlugin',
  version: '1.0.0',
  register: async (server, options) => {
    await server.register(Jwt); // Ensure the JWT plugin is registered

    server.auth.strategy('jwt', 'jwt', {
      keys: process.env.JWT_SECRET || 'your-secret-key',
      verify: {
        aud: false,
        iss: false,
        sub: false,
        maxAgeSec: 14400, // 4 hours
      },
      validate: async (artifacts, request, h) => {
        try {
          // artifacts contains decoded token
          return {
            isValid: true,
            credentials: artifacts.decoded.payload
          };
        } catch (err) {
          return {
            isValid: false
          };
        }
      }
    });

    // Set jwt as default auth strategy
    server.auth.default('jwt');
  }
};

module.exports = authPlugin;
