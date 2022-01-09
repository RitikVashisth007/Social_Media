const { gql } = require("apollo-server-express");

module.exports = gql`
  type AuthPayload {
    new_user: Boolean
    token: String
    user: User
  }
`;
