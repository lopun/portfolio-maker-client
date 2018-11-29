import gql from "graphql-tag";

export const DELETE_PROJECT = gql`
    mutation deleteProject($id: Int!) {
        DeleteProject(id: $id) {
            ok
            error
        }
    }
`;

export const UPDATE_PROJECT = gql`
    mutation updateProject($id: Int!, $name: String!, $content: String!, $stack: [String]) {
        UpdateProject(id: $id, name: $name, content: $content, stack: $stack) {
            ok
            error
        }
    }
`;

