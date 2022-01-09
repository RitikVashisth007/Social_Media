import gql from "graphql-tag";

export const GET_ALL_USER = gql`
  query {
    allUser {
      _id
      email
      full_name
      avatar
    }
  }
`;
