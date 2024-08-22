const jwt = require("jsonwebtoken");
const Boom = require("@hapi/boom");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const validateToken = (request, h) => {
  const authorizationHeader = request.headers.authorization;
  const token = authorizationHeader && authorizationHeader.split(" ")[1];

  if (!authorizationHeader) {
    throw Boom.unauthorized("No token provided");
  }

  if (!token) {
    throw Boom.unauthorized("Invalid token");
  }

  try {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw Boom.unauthorized("Token expired");
        } else {
          throw Boom.unauthorized("Invalid token");
        }
      }

      request.user = decoded;

      return h.continue;
    });
  } catch (err) {
    if (err.isBoom) {
      throw err.Boom;
    }
    throw Boom.unauthorized("Invalid token");
  }
};

module.exports = validateToken;
