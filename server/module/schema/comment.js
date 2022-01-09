const { gql } = require("apollo-server-express");

module.exports = gql`
  type Comments {
        _id: ID!
        createdAt: String!
        username: String!
        comment: String!
        createdBy:User!
    }
`;
