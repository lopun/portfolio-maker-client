import gql from "graphql-tag";

export const GET_PROJECTS_BY_ID = gql`
  query getProjectsById {
    GetProjectsById {
      ok
      error
      projects {
        id
        name
        content
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($name: String!, $content: String!) {
    CreateProject(name: $name, content: $content) {
      ok
      error
    }
  }
`;
