const { gql } = require("apollo-server-express");

module.exports = gql`
  input loginInput {
    email: String!
    password: String!
  }
  input registerInput {
    email: String!
    password: String!
    name: String!
  }
  input newPostInput {
    content:String!
    contentUrl:String!
  }
  input newCommentInput {
    postId:String!
    comment:String!
  }
  input messageInput {
    to:String!
    content:String!
  }
`;
