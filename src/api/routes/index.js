const {
  getUserByAdmin,
  getUserByName,
  grtAllUsers,
} = require("../modules/user/user.controller");
const { signin, signup } = require("../modules/auth/auth.controller");
const { createBlog } = require("../modules/blog/blog.controller");

const routes = [
  {
    method: "POST",
    path: "/auth/signup",
    handler: signup,
  },
  {
    method: "GET",
    path: "/users",
    handler: grtAllUsers,
  },
  {
    method: "GET",
    path: "/users/{user_name}",
    handler: getUserByName,
  },
  {
    method: "GET",
    path: "/users/admin/{user_name}",
    handler: getUserByAdmin,
  },
  {
    method: "POST",
    path: "/auth/signin",
    handler: signin,
  },
  {
    method: "POST",
    path: "/blogs",
    handler: createBlog,
  },
];

module.exports = routes;
