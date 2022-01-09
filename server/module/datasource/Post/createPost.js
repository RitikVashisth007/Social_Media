const Post = require("../../models/post");
const mongoose = require("mongoose");

async function createPost({
    user,
    contentUrl,
    content
}) {
  const createPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    createdBy:user.userId, 
    contentUrl,
    content 
  });
  const post = await createPost.save();
  return post;
}

module.exports.createPost = createPost;
