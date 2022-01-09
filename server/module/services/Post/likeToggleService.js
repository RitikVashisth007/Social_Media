const datasources = require("../../datasource");
const checkAuth = require("../../../utils/checkAuth")

async function action(postId, context) {
  const user = checkAuth(context);
  try {
    const post = await datasources.likeToggle({
      user,
      postId
    });

    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function likeToggleService(input, context) {
  const post = await action(input, context);
  return post;
}

module.exports.likeToggleService = likeToggleService;
