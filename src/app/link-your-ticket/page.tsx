import FooterProgressBar, { StepsType } from "@/components/footer-progress-bar";
import LinkedAndVerifiedTicket from "@/components/link-your-ticket/linked-and-verified-ticket";
import LinkingTicketContainer from "@/components/link-your-ticket/linking-ticket-container";
import OrderDetails from "@/components/link-your-ticket/order-details";

export default function LinkYourTicket() {
  const footerSteps: StepsType[] = [
    { name: "Share your booking details", status: "completed" },
    {
      name: "Review your booking",
      status: "active",
    },
    { name: "Start selling your ticket", status: "pending" },
  ];
  return (
    <>
      {/* <LinkedAndVerifiedTicket /> */}
      {/* <OrderDetails /> */}
      <LinkingTicketContainer />
      <FooterProgressBar STEPS={footerSteps} />
    </>
  );
}
