const datasources = require("../../datasource");

async function getPostsService() {
  const posts = await datasources.getPosts()
  return posts;
}

module.exports.getPostsService = getPostsService;
