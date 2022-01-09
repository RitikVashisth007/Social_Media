const { getMessageService } = require("../../services");

module.exports = {
  Query: { 
    async getMessages(_, args, context, __) {
      const { from } = args;
      const response = await getMessageService(from, context);
      return response;
    },
  },
};