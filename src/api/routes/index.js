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
  {
    method: "GET",
    path: "/blogs",
    handler: getBlogs,
  },
  {
    method: "GET",
    path: "/blogs/{blog_id}",
    handler: getBlogById,
  },
  {
    method: "DELETE",
    path: "/blogs/{blog_id}",
    handler: deleteBlog,
  },
];

module.exports = routes;
