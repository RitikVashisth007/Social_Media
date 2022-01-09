import gql from "graphql-tag";

export const ADD_COMMENT = gql`
mutation($input:newCommentInput){
  createComment(input:$input){
    _id
    contentUrl
  }
}
`;
