module.exports = {
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
    newMessage: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_MESSAGE')
    },
  },
};
  