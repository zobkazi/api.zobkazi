// src/api/routes.js
const {
  getUserByAdmin,
  getUserByName,
  grtAllUsers,
  updateUser,
} = require("../modules/user/user.controller");
const { registerController, loginController, logout } = require("../modules/auth/auth.controller");
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
    path: "/auth/register",
    handler: registerController,
    options: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/auth/login",
    handler: loginController,
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
  // users
  {
    method: "PUT",
    path: "/api/user/update/{userId}",
    handler: updateUser,
    options: {
      auth: "basic",
    },
  },
  {
    method: "GET",
    path: "/api/users",
    handler: grtAllUsers,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/api/user/{name}",
    handler: getUserByName,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/api/dashboard/admin/{name}",
    handler: getUserByAdmin,
    options: {
      auth: "basic",
    },
  },
  {
    method: "POST",
    path: "/api/blog",
    handler: createBlog,
    options: {
      auth: "basic",
    },
  },
  {
    method: "GET",
    path: "/api/blogs",
    handler: getBlogs,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/api/blog/{blog_id}",
    handler: getBlogById,
    options: {
      auth: "basic",
    },
  },
  {
    method: "DELETE",
    path: "/api/blog/{blog_id}",
    handler: deleteBlog,
    options: {
      auth: "basic",
    },
  },
   // Swagger Docs Route
   {
    method: "GET",
    path: "/docs",
    handler: (request, h) => {
      return h.redirect('/documentation');
    },
    options: {
      auth: false
    },
  },
];

module.exports = routes;
