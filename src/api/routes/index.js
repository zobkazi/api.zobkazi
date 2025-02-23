// src/api/routes.js
const {
  getAllUsersController,
  getUserByAdminController,
  getUserByNameController,
  updateUserController
} = require("../modules/user/user.controller");

const {
  registerController,
  loginController,
  deleteUserController,
  logoutController,
} = require("../modules/auth/auth.controller");

const {
createBlog, deleteBlog, getAllBlogs, getBlogBySlug, updateBlog 
} = require("../modules/blog/blog.controller");

const { checkAdminRole } = require("../../plugins/checkAdminRole");

/**
 * API Routes Configuration
 * Groups routes by feature area (auth, users, blogs)
 */
const routes = [
  // Authentication Routes
  {
    method: "POST",
    path: "/api/auth/register",  // Added /api prefix for consistency
    handler: registerController,
    options: {
      auth: false,
      tags: ["api", "auth"],
      description: "Register a new user",
    }
  },
  {
    method: "POST",
    path: "/api/auth/login",
    handler: loginController,
    options: {
      auth: false,
      tags: ["api", "auth"],
      description: "Login user"
    }
  },
  {
    method: "POST",
    path: "/api/auth/logout",
    handler: logoutController,
    options: {
      auth: "session",
      tags: ["api", "auth"],
      description: "Logout user"
    }
  },
  {
    method: "DELETE",
    path: "/api/auth/delete/{userId}",
    handler: deleteUserController,
    options: {
      auth: "jwt",
      tags: ["api", "auth"],
      description: "Delete user"
    }
  },  

  // User Routes
  {
    method: "PUT",
    path: "/api/users/{id}",  // Made path more RESTful
    handler: updateUserController,
    options: {
      auth: "jwt",
      tags: ["api", "users"],
      description: "Update user information"
    }
  },
  {
    method: "GET",
    path: "/api/users",
    handler: getAllUsersController,  // Fixed function name
    options: {
      auth: false,
      tags: ["api", "users"],
      description: "Get all users"
    }
  },
  {
    method: "GET",
    path: "/api/users/{username}",  // Made path more RESTful
    handler: getUserByNameController,
    options: {
      auth: false,
      tags: ["api", "users"],
      description: "Get user by name"
    }
  },
  {
    method: "GET",
    path: "/api/admin/users/{name}",  // Organized admin routes
    handler: getUserByAdminController,
    options: {
      auth: "jwt",
      tags: ["api", "admin"],
      description: "Admin: Get user by name",
      pre: [{ method: checkAdminRole }]
    }
  },

  // Blog Routes
  {
    method: "POST",
    path: "/api/blogs",  // Made path more RESTful
    handler: createBlog,
    options: {
      auth: "jwt",
      tags: ["api", "blogs"],
      description: "Create a new blog post"
    }
  },
  {
    method: "GET",
    path: "/api/blogs",
    handler: getAllBlogs,
    options: {
      auth: false,
      tags: ["api", "blogs"],
      description: "Get all blog posts"
    }
  },
  {
    method: "GET",
    path: "/api/blogs/{slug}",  // Consistent parameter naming
    handler: getBlogBySlug,
    options: {
      auth: "jwt",
      tags: ["api", "blogs"],
      description: "Get blog post by ID"
    }
  },
  {
    method: "PUT",
    path: "/api/blogs/{blogId}",  // Consistent parameter naming
    handler: updateBlog,
    options: {
      auth: "jwt",
      tags: ["api", "blogs"],
      description: "Update blog post by ID"
    }
  },
  {
    method: "DELETE",
    path: "/api/blogs/{blogId}",  // Consistent parameter naming
    handler: deleteBlog,
    options: {
      auth: "jwt",
      tags: ["api", "blogs"],
      description: "Delete blog post"
    }
  },

  // Documentation Routes
  {
    method: "GET",
    path: "/docs",
    handler: (request, h) => {
      return h.redirect("/documentation");
    },
    options: {
      auth: false,
      tags: ["api", "documentation"],
      description: "API documentation"
    }
  }
];

module.exports = routes;