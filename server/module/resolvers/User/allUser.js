const services = require("../../services");

module.exports = {
    Query: {
      allUser: async (_, args, context) => {
          const users = await services.getAllUser()
          return users
      },
    },
  };  