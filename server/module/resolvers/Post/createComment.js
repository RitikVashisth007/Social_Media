const { createCommentService } = require("../../services");

module.exports = {
  Mutation: {
    async createComment(_, args, context, __) {
      const { input } = args;
      const response = await createCommentService(input, context);
      return response;
    },
  },
};