import gql from "graphql-tag";

export const REGISTER = gql`
mutation($input:registerInput){
  register(input:$input){
    full_name
    _id
  }
}
`;
