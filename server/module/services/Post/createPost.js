const datasources = require("../../datasource");
const checkAuth = require("../../../utils/checkAuth")

async function action(input, context) {
  const user = checkAuth(context);
  const { contentUrl, content } = input;
  try {
    const post = await datasources.createPost({
      user,
      contentUrl,
      content, 
    });

    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function createPostService(input, context) {
  const post = await action(input, context);
  return post;
}

module.exports.createPostService = createPostService;
