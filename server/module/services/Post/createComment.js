const datasources = require("../../datasource");
const checkAuth = require("../../../utils/checkAuth")

async function action(input, context) {
    const {postId, comment} = input
  const user = checkAuth(context);
  try {
    const post = await datasources.createComment({
      user,
      postId,
      comment
    });

    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function createCommentService(input, context) {
  const post = await action(input, context);
  return post;
}

module.exports.createCommentService = createCommentService;
