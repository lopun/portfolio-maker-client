import gql from "graphql-tag";

export const GET_USER_PROFILE = gql`
  query getUserProfile($id: Int!) {
    GetUserProfile(id: $id) {
      ok
      error
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
