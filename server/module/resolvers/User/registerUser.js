const { registerUserService } = require("../../services");

module.exports = {
  Mutation: {
    async register(_, args, context, __) {
      const { input } = args;
      const response = await registerUserService(input);

      return response;
    },
  },
};