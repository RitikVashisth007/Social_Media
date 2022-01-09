import gql from "graphql-tag";

export const NEW_MESSAGE = gql`
  subscription {
    newMessage {
      _id
      content
      from {
        _id
        full_name
        email
      }
      to {
        _id
        full_name
        email
      }
    }
  }
`;
