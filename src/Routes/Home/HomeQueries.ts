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
