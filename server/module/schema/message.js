const { gql } = require("apollo-server-express");

module.exports = gql`
  type Message {
        _id:ID!
        content:String!
        from:User!
        to:User!
    }
`;
