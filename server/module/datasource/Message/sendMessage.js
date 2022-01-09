const Message = require("../../models/message");

async function sendMessage({ user, to, content }) {
  const newMessage = new Message({
    from: user.userId,
    to,
    content,
  });
  const message = await newMessage.save().then((newMessage) =>
    newMessage
      .populate([
        {
          path: "from",
          model: "user",
        },
        {
          path: "to",
          model: "user",
        },
      ])
      .execPopulate()
  );
  return message;
}

module.exports.sendMessage = sendMessage;
