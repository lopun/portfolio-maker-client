import gql from "graphql-tag";

export const GET_USER_PROFILE = gql`
  query getUserProfile($id: Int!) {
    GetUserProfile(id: $id) {
      ok
      error
      likeCount
      myLike {
        state
      }
      user {
        id
        email
        fullName
        age
        resume {
          id
          name
          content
        }
        projects {
          id
          name
          content
        }
      }
    }
  }
`;

export const CREATE_LIKE = gql`
  mutation createLike($receiverId: Int!) {
    CreateLike(receiverId: $receiverId) {
      ok
      error
      likeState
    }
  }
`;
