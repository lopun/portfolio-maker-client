import gql from "graphql-tag";

export const UPDATE_RESUME = gql`
    mutation updateResume($id: Int!, $name: String, $content: String) {
        UpdateResume(id: $id, name: $name, content: $content) {
            ok
            error
        }
    }
`;