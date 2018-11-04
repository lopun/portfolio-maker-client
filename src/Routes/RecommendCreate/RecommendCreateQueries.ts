import gql from "graphql-tag";

export const CREATE_RECOMMEND = gql`
  mutation createRecommend($content: String!, $receiverId: Int!) {
    CreateRecommend(content: $content, receiverId: $receiverId) {
      ok
      error
    }
  }
`;
