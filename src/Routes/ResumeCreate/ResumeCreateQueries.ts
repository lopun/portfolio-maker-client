import gql from "graphql-tag";

export const CREATE_RESUME = gql`
  mutation createResume($name: String!, $content: String!) {
    CreateResume(name: $name, content: $content) {
      ok
      error
    }
  }
`;
