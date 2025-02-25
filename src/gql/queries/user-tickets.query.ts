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

export interface TICKET_RESPONSE_TYPE {
  ticket: {
    listings: {
      items: {
        price: string;
      }[];
    };
    seat: string;
    event: {
      eventDate: string;
    };
  };
}

export const USER_TICKET_QUERY = gql`
  query Ticket($ticketId: String!) {
    ticket(id: $ticketId) {
      listings {
        items {
          price
        }
      }
      seat
      event {
        eventDate
      }
    }
  }
`;
