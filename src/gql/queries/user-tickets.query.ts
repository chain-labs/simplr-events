import { gql } from "graphql-request";

export interface USER_TICKET_RESPONSE_TYPE {
  user: {
    address: string;
    ticketsOwned: {
      items: {
        eventId: string;
        id: string;
        seat: string;
        ticketSerialNumberHash: string;
        tokenMetadata: string;
        tokenURI: string;
      }[];
    };
  };
}

export const USER_TICKETS_QUERY = gql`
  query User($userId: String!) {
    user(id: $userId) {
      address
      ticketsOwned {
        items {
          eventId
          id
          seat
          ticketSerialNumberHash
          tokenMetadata
          tokenURI
        }
      }
    }
  }
`;
