const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  type User {
    _id: ID
    full_name: String
    email: String
    avatar: String
    password: String
    updated_at: Date
    created_at: Date
  }
`;
