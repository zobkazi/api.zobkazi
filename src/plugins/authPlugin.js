// const Hapi = require("@hapi/hapi");
// const Jwt = require("@hapi/jwt");

// const authPlugin = {
//   name: "authPlugin",
//   register: async (server, options) => {
//     // Register JWT plugin
//     await server.register(Jwt);

//     // Define JWT authentication strategy
//     server.auth.strategy("jwt", "jwt", {
//       keys: process.env.JWT_SECRET || "zobkazi", // Your JWT secret key
//       verify: {
//         aud: false,
//         iss: false,
//         sub: false,
//         maxAgeSec: 14400, // Token expiration time (4 hours)
//       },
//       validate: async (artifacts, request, h) => {
//         const payload = artifacts.decoded.payload;
//         return { isValid: true, credentials: payload };
//       },
//     });

//     // Set default authentication strategy
//     server.auth.default("jwt");
//   },
// };

// module.exports = authPlugin;
