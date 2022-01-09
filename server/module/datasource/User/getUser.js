const User = require("../../models/user");

async function getUser(userId) {
  const user = await User.findOne(userId);
  return user;
}

module.exports.getUser = getUser;