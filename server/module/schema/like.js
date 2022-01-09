const { gql } = require("apollo-server-express");

module.exports = gql`
  type Like {
        _id: ID!
        createdAt: String!
        username: String!
        likedBy:String!
    }
`;
