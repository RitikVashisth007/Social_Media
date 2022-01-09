import gql from "graphql-tag";

export const SEND_MESSAGE = gql`
mutation($input:messageInput){
  sendMessage(input:$input){
    _id
    content
    to{
      full_name
    }
  }
}
`;
