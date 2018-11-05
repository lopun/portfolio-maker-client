import gql from "graphql-tag";

export const GET_PROJECTS_BY_ID = gql`
  query getProjectsById {
    GetProjectsById {
      ok
      error
      projects {
        id
        name
        stack
        content
        createdAt
        updatedAt
        author {
          id
          fullName
          profilePhoto
        }
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($name: String!, $content: String!, $stack: [String]) {
    CreateProject(name: $name, content: $content, stack: $stack) {
      ok
      error
    }
  }
`;
