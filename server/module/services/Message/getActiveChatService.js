const datasources = require("../../datasource");
const checkAuth = require("../../../utils/checkAuth");
async function action(context) {
  const user = checkAuth(context);
  try {
    const messages = await datasources.getAllMessage({
      user,
    });

    return messages;
  } catch (error) {
    throw new Error(error);
  }
}

async function getActiveChatService(context) {
  const user = checkAuth(context);
  const messages = await action(context);

  const otherUser = messages.map((item) => {
    if (item.from._id.toString() !== user.userId.toString()) {
      return {
        ...item.from._doc,
      };
    }
    if (item.to._id.toString() !== user.userId.toString()) {
      return {
        ...item.to._doc,
      };
    }
  });
  const otherUsersData = [
    ...new Map(otherUser.map((item) => [item["email"], item])).values(),
  ];

  return otherUsersData;
}

module.exports.getActiveChatService = getActiveChatService;
