const Basic = require("@hapi/basic");


const validateToken = async (request, h) => { 

  const token = request.headers.authorization;
  if (!token) {
    return Boom.unauthorized(null, "No token provided");
  }
  try {
    const credentials = await Basic(token);
    return h.authenticated({ credentials });
  } catch (err) {
    return Boom.unauthorized(null, "Invalid token provided");
  }
}