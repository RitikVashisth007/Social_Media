const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    _id: ID
    contentUrl: String
    content: String
    createdBy:User
    comments: [Comments]!
    likes: [Like]!
    likeCount: Int!   
    commentCount: Int!
  }
`;
