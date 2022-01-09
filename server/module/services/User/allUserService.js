const datasources = require("../../datasource");

async function getAllUser() {
  const user = await datasources.allUsers()
  return user;
}

module.exports.getAllUser = getAllUser;
