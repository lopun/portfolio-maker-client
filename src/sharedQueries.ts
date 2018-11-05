import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        profilePhoto
        firstName
        lastName
        email
        fullName
        age
        resume {
          id
          name
          content
        }
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
        stack
      }
    }
  }
`;

export const GET_RESUME = gql`
  query getResume($id: Int!) {
    GetResume(id: $id) {
      ok
      error
      resume {
        name
        content
      }
    }
  }
`;
