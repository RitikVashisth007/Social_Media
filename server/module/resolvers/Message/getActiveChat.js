const { getActiveChatService } = require("../../services");

module.exports = {
  Query: { 
    async getActiveChat(_, args, context, __) {
      const response = await getActiveChatService(context);
      return response;
    },
  },
};