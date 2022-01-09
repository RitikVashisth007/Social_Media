import gql from "graphql-tag";

export const GET_ACTIVE_CHAT = gql`
query{
  getActiveChat{
    full_name
    _id
    email
  }
}
`;