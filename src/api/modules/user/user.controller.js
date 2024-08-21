const userController = [
  {
    method: "GET",
    path: "/users",
    handler: async (request, h) => {
      return "user controller is working";
    },
  },
];

module.exports = userController;
