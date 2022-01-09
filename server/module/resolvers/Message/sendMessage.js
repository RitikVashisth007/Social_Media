const { sendMessageService } = require("../../services");

module.exports = {
  Mutation: {
    async sendMessage(_, args, context, __) {
      const { input } = args;
      const response = await sendMessageService(input, context);
      context.pubsub.publish('NEW_MESSAGE', {
        newMessage: response
      }); 
      return response;
    },
  },
};