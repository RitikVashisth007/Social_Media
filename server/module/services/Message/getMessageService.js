const datasources = require("../../datasource");
const checkAuth = require("../../../utils/checkAuth")

async function action(from, context) {
  const user = checkAuth(context);
  try {
    const messages = await datasources.getMessage({
      user,
      from
    });

    return messages;
  } catch (error) {
    throw new Error(error);
  }
}

async function getMessageService(from, context) {
  const messages = await action(from, context);
  return messages;
}

module.exports.getMessageService = getMessageService;
