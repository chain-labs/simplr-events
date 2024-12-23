import { PiShootingStarDuotone } from "react-icons/pi";

import { Ticket } from "@/types/ticket";

export const dummyTickets: Ticket[] = [
  {
    id: "1",
    eventName: "Summer Music Festival",
    seat: "A123",
    ticketId: "123",
    startDate: "Sep 23, 2024",
    startTime: "12:00 PM ET",
    endDate: "Sep 25, 2024",
    endTime: "8:00 PM ET",
    startDay: 1,
    endDay: 3,
    other: "Central Park",
    EventIcon: PiShootingStarDuotone,
    location: "New York, USA",
    price: "$250",
    priceCategory: "average",
    orderId: "OD123456789",
  },
  {
    id: "2",
    eventName: "Tech Conference",
    seat: "B456",
    ticketId: "987",
    startDate: "Sep 23, 2024",
    startTime: "10:00 AM ET",
    endDate: "Sep 25, 2024",
    endTime: "5:00 PM ET",
    startDay: 1,
    endDay: 3,
    other: "Convention Center",
    EventIcon: PiShootingStarDuotone,
    location: "San Francisco, USA",
    price: "$500",
    priceCategory: "highest",
    orderId: "OD987654321",
  },
  {
    id: "3",
    eventName: "Food & Wine Expo",
    seat: "C789",
    ticketId: "234",
    startDate: "Sep 23, 2024",
    startTime: "11:00 AM ET",
    endDate: "Sep 25, 2024",
    endTime: "7:00 PM ET",
    startDay: 1,
    endDay: 3,
    other: "City Hall",
    EventIcon: PiShootingStarDuotone,
    location: "Paris, France",
    price: "$100",
    priceCategory: "lowest",
    orderId: "OD123456789",
  },
  {
    id: "4",
    eventName: "Art Gallery Opening",
    seat: "D101",
    ticketId: "876",
    startDate: "Sep 23, 2024",
    startTime: "2:00 PM ET",
    endDate: "Sep 25, 2024",
    endTime: "10:00 PM ET",
    startDay: 1,
    endDay: 3,
    other: "Downtown Museum",
    EventIcon: PiShootingStarDuotone,
    location: "London, UK",
    price: "$350",
    priceCategory: "average",
    orderId: "OD987654321",
  },
];