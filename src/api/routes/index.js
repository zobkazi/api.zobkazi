// src/api/routes.js
const {
  getUserByAdmin,
  getUserByName,
  grtAllUsers,
  updateUser,
} = require("../modules/user/user.controller");
const { signin, signup, logout } = require("../modules/auth/auth.controller");
const { createBlog } = require("../modules/blog/blog.controller");
const {
  getBlogs,
  getBlogById,
  deleteBlog,
} = require("../modules/blog/blog.controller");
const { checkAdminRole } = require("../../plugins/checkAdminRole");

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
    method: "POST",
    path: "/auth/logout",
    handler: logout,
    options: {
      auth: "session",
    },
  },
  {
    method: "PUT",
    path: "/users/update/{userId}",
    handler: updateUser,
    options: {
      auth: "basic",
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
    path: "/dashboard/admin/{name}",
    handler: getUserByAdmin,
    options: {
      auth: "basic",
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
