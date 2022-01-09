const { loginUserService } = require("../../services");

module.exports = {
  Mutation: {
    async login(_, args, context, __) {
      const { input } = args;
      const response = await loginUserService(input);

      return response;
    },
  },
};
