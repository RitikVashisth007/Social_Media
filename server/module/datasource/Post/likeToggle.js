const Post = require("../../models/post");
const { UserInputError } = require("apollo-server-errors");

async function likeToggle({ user, postId }) {
  const post = await Post.findById(postId);
  if (post) {
    if (post.likes.find((like) => like.likedBy.toString() === user.userId.toString())) {
      // Post already likes, unlike it
      post.likes = post.likes.filter((like) => like.likedBy.toString() !== user.userId.toString()); 
    } else {
      // else like the post  
      post.likes.push({
        likedBy: user.userId,
      }); 
    }
    await post.save();
    return post;
  } else throw new UserInputError("Post not found");    
}

module.exports.likeToggle = likeToggle;
  