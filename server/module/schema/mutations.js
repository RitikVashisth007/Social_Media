const { gql } = require("apollo-server-express");

module.exports = gql`
  type Mutation {
    login(input: loginInput): AuthPayload
    register(input: registerInput): User 
    createPost(input:newPostInput):Post
    likeToggle(postId: ID!): Post! 
    createComment(input: newCommentInput): Post! 
    sendMessage(input: messageInput): Message! 
  }
`;
