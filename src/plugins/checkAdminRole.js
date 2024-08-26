const Boom = require("@hapi/boom");

// Middleware to check if the user is an admin
const checkAdminRole = async (request, h) => {
  const user = request.auth.credentials;

  if (user.role !== "admin") {
    return h.redirect("/signin"); // Redirect if not an admin
  }

  return h.continue; // Continue if the user is an admin
};

module.exports = {
  checkAdminRole,
};
