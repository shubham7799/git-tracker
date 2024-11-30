import { gql } from "@apollo/client";

export const UPDATE_LAST_RELEASE = gql`
  mutation UpdateLastRelease($id: Int!, $last_release: String) {
    updateLastRelease(id: $id, last_release: $last_release) {
      id
      last_release
    }
  }
`;
