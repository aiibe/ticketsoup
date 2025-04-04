import useAuthStore from "@/features/auth/useAuthStore";
import TicketView from "@/features/tickets/TicketView";
import Section from "@/layouts/Section";
import { Redirect, useParams } from "wouter";

export default function TicketPage() {
  const { id } = useParams<{ id: string }>();

  const auth = useAuthStore((state) => state.auth);
  if (!auth?.isValid) return <Redirect to="/login" />;

  return (
    <Section className="bg-card">
      <TicketView ticketId={id} />
    </Section>
  );
}
