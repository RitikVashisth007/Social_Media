import gql from "graphql-tag";

export const GET_POST = gql`
  query {
    getPosts {
      _id
      contentUrl
      content
      createdBy {
        full_name
        email
        avatar
      }
      comments{
        comment
        createdBy{
          _id
          full_name
          email
        }
      }
      likeCount
      likes{
        likedBy
      }
      commentCount
    }
  }
`;
