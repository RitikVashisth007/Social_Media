const services = require("../../services");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    getPosts: async (_, args, context) => {
      const posts = await services.getPostsService();
      return posts;
    },
  },
};
