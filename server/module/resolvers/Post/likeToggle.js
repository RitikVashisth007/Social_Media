const { likeToggleService } = require("../../services");

module.exports = {
  Mutation: {
    async likeToggle(_, args, context, __) {
      const { postId } = args;
      const response = await likeToggleService(postId, context); 
      return response;
    },
  },
};