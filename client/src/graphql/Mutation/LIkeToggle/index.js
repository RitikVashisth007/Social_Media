import gql from "graphql-tag";

export const LIKE_TOGGLE = gql`
  mutation ($postId: ID!) {
    likeToggle(postId: $postId) {
      _id
    }
  }
`;
