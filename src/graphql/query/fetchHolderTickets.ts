import { gql } from '@apollo/client'

const FETCH_HOLDER_TICKETS = gql`
  query FetchHolderTickets($id: String) {
    holders(where: { id_contains_nocase: $id }) {
      address {
        address
      }
      tickets {
        tokenId
        metadataCid
        creationTimeStamp
        creationTrx
        dataCid
        simplrEvent {
          name
        }
      }
    }
  }
`

export default FETCH_HOLDER_TICKETS
