const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    allUser:[User]
    getMessages(from: ID!): [Message]
    getPosts:[Post]
    getActiveChat:[User]

  }
`;
