const userController = require("../modules/user/user.controller");
const authController = require("../modules/auth/auth.controller");

const routes = [...userController, ...authController];

module.exports = routes;
