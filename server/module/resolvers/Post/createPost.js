const { createPostService } = require("../../services");

module.exports = {
  Mutation: {
    async createPost(_, args, context, __) {
      const { input } = args;
      const response = await createPostService(input, context);
      context.pubsub.publish('NEW_POST', {
        newPost: response
      }); 
      return response;
    },
  },
};