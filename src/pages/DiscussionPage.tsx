import useAuthStore from "@/features/auth/useAuthStore";
import OtpForm from "@/features/otp/OtpForm";
import TicketView from "@/features/tickets/TicketView";
import Section from "@/layouts/Section";
import { useParams } from "wouter";

export default function DiscussionPage() {
  const { id } = useParams<{ id: string }>();
  const isAuth = useAuthStore((state) => state.auth);

  if (!isAuth)
    return (
      <div className="flex w-full items-center justify-center">
        <OtpForm
          title="Access required"
          description="You need to be logged in to view this ticket"
          type="customer"
        />
      </div>
    );

  return (
    <Section>
      <TicketView ticketId={id} />
    </Section>
  );
}
