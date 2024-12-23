import FooterProgressBar, { StepsType } from "@/components/footer-progress-bar";
import SellingLinkedTicket from "@/components/sell-your-ticket/selling-linked-ticket";

export default function LinkYourTicket() {
  const footerSteps: StepsType[] = [
    {
      name: "Your details",
      status: "completed",
      description: "Please provide your name and email",
    },
    {
      name: "Company details",
      status: "active",
      description: "A few details about your company",
    },
    {
      name: "Invite your team",
      status: "pending",
      description: "Start collaborating with your team",
    },
  ];
  return (
    <>
      <SellingLinkedTicket />
      <FooterProgressBar STEPS={footerSteps} />
    </>
  );
}
