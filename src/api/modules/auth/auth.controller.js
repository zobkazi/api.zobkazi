const authController = [
  {
    method: "POST",
    path: "/auth/login",
    handler: async (request, h) => {
      return h
        .res({
          message: "auth controller POST is working",
          data: "auth controller POST is working",
          success: true,
          status: 200,
          error: null,
        })
        .code(200);
    },
  },
];

module.exports = authController;
