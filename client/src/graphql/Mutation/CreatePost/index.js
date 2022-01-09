import gql from "graphql-tag";

export const CREATE_POST = gql`
  mutation ($input: newPostInput) {
    createPost(input: $input) {
      _id
      contentUrl
    }
  }
`;
