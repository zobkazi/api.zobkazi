// src/api/routes.js
const {
  getUserByAdmin,
  getUserByName,
  grtAllUsers,
} = require("../modules/user/user.controller");
const { signin, signup } = require("../modules/auth/auth.controller");
const { createBlog } = require("../modules/blog/blog.controller");
const {
  getBlogs,
  getBlogById,
  deleteBlog,
} = require("../modules/blog/blog.controller");

const routes = [
  {
    method: "POST",
    path: "/auth/signup",
    handler: signup,
    options: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/auth/signin",
    handler: signin,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/users",
    handler: grtAllUsers,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/users/{name}",
    handler: getUserByName,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/users/admin/{user_name}",
    handler: getUserByAdmin,
    options: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/blogs",
    handler: createBlog,
    options: {
      auth: "basic",
    },
  },
  {
    method: "GET",
    path: "/blogs",
    handler: getBlogs,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/blogs/{blog_id}",
    handler: getBlogById,
    options: {
      auth: "basic",
    },
  },
  {
    method: "DELETE",
    path: "/blogs/{blog_id}",
    handler: deleteBlog,
    options: {
      auth: "basic",
    },
  },
];

module.exports = routes;
