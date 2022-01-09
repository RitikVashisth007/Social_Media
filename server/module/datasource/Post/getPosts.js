const Post = require("../../models/post");

async function getPosts() {
  const posts = await Post.find().populate([
    {
      path: "createdBy",
      model: "user",
    },
    {
      path: "comments",
      populate: {
        path: "createdBy",
        model: "user",
      },
    },
  ]).sort([['created_at', -1]]);
  return posts;
}

module.exports.getPosts = getPosts;
