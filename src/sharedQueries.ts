import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        profilePhoto
        firstName
        lastName
        email
        fullName
        age
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($id: Int!) {
    GetProject(id: $id) {
      ok
      error
      project {
        id
        name
        content
      }
    }
  }
`;
