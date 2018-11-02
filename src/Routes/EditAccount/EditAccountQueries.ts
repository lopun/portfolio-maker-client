import { gql } from "apollo-boost";

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $firstName: String
    $lastName: String
    $email: String
    $profilePhoto: String
    $password: String
    $age: Int
  ) {
    UpdateProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      profilePhoto: $profilePhoto
      password: $password
      age: $age
    ) {
      ok
      error
    }
  }
`;
