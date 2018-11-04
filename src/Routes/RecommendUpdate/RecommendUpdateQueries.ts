import gql from "graphql-tag";

// export const CREATE_RECOMMEND = gql`
//   mutation createRecommend($content: String!, $receiverId: Int!) {
//     CreateRecommend(content: $content, receiverId: $receiverId) {
//       ok
//       error
//     }
//   }
// `;

export const UPDATE_RECOMMEND = gql`
  mutation updateRecommend($id: Int!, $content: String!) {
    UpdateRecommend(content: $content, id: $id) {
      ok
      error
    }
  }
`;

export const GET_RECOMMEND = gql`
  query getRecommend($id: Int!) {
    GetRecommend(id: $id) {
      ok
      error
      recommend {
        id
        content
        receiverId
      }
    }
  }
`;
