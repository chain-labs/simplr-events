import { gql } from '@apollo/client'

export const FETCH_EVENT_OWNER_QUERY = gql`
  query FetchTreeCid($name: String) {
    simplrEvents(where: { name: $name }) {
      owner {
        address
      }
    }
  }
`
