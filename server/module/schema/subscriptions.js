
const { gql } = require("apollo-server-express");

module.exports = gql`
  type Subscription {
    newPost: Post!
    newMessage: Message!
  }
`;


