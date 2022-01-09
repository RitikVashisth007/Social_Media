import gql from "graphql-tag";

export const LOGIN = gql`
  mutation($input:loginInput){
  login(input:$input){
    token
    user{
      _id
      full_name
      email
      avatar
    }
  }
}
`;
