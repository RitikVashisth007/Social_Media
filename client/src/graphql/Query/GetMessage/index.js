import gql from "graphql-tag";

export const GET_MESSAGE = gql`
  query ($from: ID!) {
    getMessages(from: $from) {
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
