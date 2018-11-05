import { gql } from "apollo-boost";

export const ALL_USERS = gql`
  query allUsers {
    AllUsers {
      ok
      error
      users {
        id
        fullName
        profilePhoto
      }
    }
  }
`;

export const SEARCH_BY_STACK = gql`
  query searchByStack($input: String!) {
    SearchByStack(input: $input) {
      ok
      error
      projects {
        id
        name
        content
        author {
          lastName
        }
      }
    }
  }
`;
