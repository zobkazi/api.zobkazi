const userController = [
  {
    method: "GET",
    path: "/users",
    handler: async (request, h) => {
      return h
        .response({
          message: "user controller GET is working",
          data: "user controller GET is working",
          success: true,
          status: 200,
          error: null,
        })
        .code(200);
    },
  },
  {
    method: "POST",
    path: "/users/create",
    handler: async (request, h) => {
      return request.payload;
    },
  },
];

module.exports = userController;
