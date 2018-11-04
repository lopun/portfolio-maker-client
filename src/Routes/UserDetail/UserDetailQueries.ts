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
      existingRecommend {
        id
      }
      user {
        id
        email
        fullName
        profilePhoto
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
        recommendAsReceiver {
          id
          content
          creatorId
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
