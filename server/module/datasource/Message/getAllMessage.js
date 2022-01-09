const Message = require("../../models/message");

async function getAllMessage({ user }) {
  const messages = await Message.find({
    $or: [{ from: user.userId }, { to: user.userId }],
  }).populate([
    {
      path: "from",
      model: "user",
    },
    {
      path: "to",
      model: "user",
    },
  ]);
  return messages; 
}

module.exports.getAllMessage = getAllMessage;
