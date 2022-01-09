const Post = require("../../models/post");
const { UserInputError } = require("apollo-server-errors");

async function createComment({ user, postId, comment }) {
  const post = await Post.findById(postId);
  if (post) {
      // else like the post  
      post.comments.push({
        createdBy: user.userId,
        comment,
      });
    await post.save();
    return post;
  } else throw new UserInputError("Post not found");    
}

module.exports.createComment = createComment;