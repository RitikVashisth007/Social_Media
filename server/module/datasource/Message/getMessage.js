const Message = require("../../models/message");

async function getMessage({ user, from }) {
  const users = [user.userId, from];
  const messages = await Message.find({
    from: { $in: users },
    to: { $in: users },
  }).populate([
    {
      path: "from",
      model: "user",
    },
    {
      path: "to",
      model: "user",
    },
  ]).sort([['created_at', -1]]); 
  return messages;
}

module.exports.getMessage = getMessage;
