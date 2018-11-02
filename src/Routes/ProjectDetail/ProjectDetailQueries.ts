import gql from "graphql-tag";

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
