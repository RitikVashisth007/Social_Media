const User = require("../../models/user");

async function allUsers() {
  const user = await User.find({});
  return user;
}

module.exports.allUsers = allUsers;
