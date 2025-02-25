import { Event } from "@/types/event";
import { Order, Ticket } from "@/types/ticket";

export const dummyEvents: Event[] = [
  {
    _id: "1",
    eventName: "Summer Music Festival",
    location: "New York, USA",
    deadline: "1734170400",
    contractAddress: "0x02d5ee0b15f6598736A24C5AaA968FaeF49cd4B4",
    image:
      "https://ik.imagekit.io/chainlabs/simplr-events-designs/events/taipei_blockchain_week_3HvOXP802.jpeg",
    startDateTime: "2024-09-23T12:00:00Z",
    endDateTime: "2024-09-25T20:00:00Z",
    verificationType: "qr",
    seatInputType: "input",
    additionalInfo: ["VIP Access", "Backstage Pass Available"],
    createdAt: "2024-02-16T00:00:00Z",
    updatedAt: "2024-02-16T00:00:00Z",
    __v: 0,
  },
  {
    _id: "2",
    eventName: "Tech Conference",
    location: "San Francisco, USA",
    deadline: "1734170400",
    contractAddress: "0x02d5ee0b15f6598736A24C5AaA968FaeF49cd4B4",
    image:
      "https://ik.imagekit.io/chainlabs/simplr-events-designs/events/taipei_blockchain_week_3HvOXP802.jpeg",
    startDateTime: "2024-09-23T10:00:00Z",
    endDateTime: "2024-09-25T17:00:00Z",
    verificationType: "nfc",
    seatInputType: "dropdown",
    seatOptions: ["A1", "A2", "B1", "B2"],
    additionalInfo: ["Lunch Included", "Workshop Access"],
    createdAt: "2024-02-16T00:00:00Z",
    updatedAt: "2024-02-16T00:00:00Z",
    __v: 0,
  },
  {
    _id: "3",
    eventName: "Art Exhibition",
    location: "Paris, France",
    deadline: "1734170400",
    contractAddress: "0x02d5ee0b15f6598736A24C5AaA968FaeF49cd4B4",
    image:
      "https://ik.imagekit.io/chainlabs/simplr-events-designs/events/taipei_blockchain_week_3HvOXP802.jpeg",
    startDateTime: "2024-10-01T09:00:00Z",
    endDateTime: "2024-10-05T18:00:00Z",
    verificationType: "qr",
    seatInputType: "input",
    additionalInfo: ["Audio Guide", "Catalog Included"],
    createdAt: "2024-02-16T00:00:00Z",
    updatedAt: "2024-02-16T00:00:00Z",
    __v: 0,
  },
  {
    _id: "4",
    eventName: "Sports Championship",
    location: "London, UK",
    deadline: "1734170400",
    contractAddress: "0x02d5ee0b15f6598736A24C5AaA968FaeF49cd4B4",
    image:
      "https://ik.imagekit.io/chainlabs/simplr-events-designs/events/taipei_blockchain_week_3HvOXP802.jpeg",
    startDateTime: "2024-11-15T14:00:00Z",
    endDateTime: "2024-11-15T17:00:00Z",
    verificationType: "nfc",
    seatInputType: "dropdown",
    seatOptions: ["Block A", "Block B", "Block C"],
    additionalInfo: ["Refreshments Included", "Parking Pass"],
    createdAt: "2024-02-16T00:00:00Z",
    updatedAt: "2024-02-16T00:00:00Z",
    __v: 0,
  },
  {
    _id: "5",
    eventName: "Blockchain Summit",
    location: "Singapore",
    deadline: "1734170400",
    contractAddress: "0x02d5ee0b15f6598736A24C5AaA968FaeF49cd4B4",
    image:
      "https://ik.imagekit.io/chainlabs/simplr-events-designs/events/taipei_blockchain_week_3HvOXP802.jpeg",
    startDateTime: "2024-12-10T08:00:00Z",
    endDateTime: "2024-12-11T18:00:00Z",
    verificationType: "qr",
    seatInputType: "input",
    additionalInfo: ["Network Session", "Digital Swag Bag"],
    createdAt: "2024-02-16T00:00:00Z",
    updatedAt: "2024-02-16T00:00:00Z",
    __v: 0,
  },
];

export const dummyTickets: Ticket[] = [
  {
    _id: "1",
    event: dummyEvents[0],
    tokenId: "123",
    seat: "A123",
  },
  {
    _id: "2",
    event: dummyEvents[1],
    tokenId: "456",
    seat: "B2",
  },
  {
    _id: "3",
    event: dummyEvents[2],
    tokenId: "789",
    seat: "C45",
  },
  {
    _id: "4",
    event: dummyEvents[3],
    tokenId: "101",
    seat: "Block A",
  },
  {
    _id: "5",
    event: dummyEvents[4],
    tokenId: "102",
    seat: "D78",
  },
  {
    _id: "6",
    event: dummyEvents[0],
    tokenId: "103",
    seat: "B89",
  },
  {
    _id: "7",
    event: dummyEvents[1],
    tokenId: "104",
    seat: "A2",
  },
];

export const dummyOrders: Order[] = [
  {
    ticket: dummyTickets[0],
    price: "100",
    signature: "0x123",
  },
  {
    ticket: dummyTickets[1],
    price: "150",
    signature: "0x456",
  },
  {
    ticket: dummyTickets[2],
    price: "200",
    signature: "0x789",
  },
  {
    ticket: dummyTickets[3],
    price: "250",
    signature: "0x101",
  },
  {
    ticket: dummyTickets[4],
    price: "300",
    signature: "0x102",
  },
  {
    ticket: dummyTickets[5],
    price: "350",
    signature: "0x103",
  },
  {
    ticket: dummyTickets[6],
    price: "400",
    signature: "0x104",
  },
];
