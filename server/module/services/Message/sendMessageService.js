const datasources = require("../../datasource");
const checkAuth = require("../../../utils/checkAuth")

async function action(input, context) {
  const user = checkAuth(context);
  const {to, content} = input
  try {
    const message = await datasources.sendMessage({
      user,
      to,
      content
    });

    return message;
  } catch (error) {
    throw new Error(error);
  }
}

async function sendMessageService(input, context) {
  const message = await action(input, context);
  return message;
}

module.exports.sendMessageService = sendMessageService;
