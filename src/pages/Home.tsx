import useAuthStore from "@/features/auth/useAuthStore";
import TicketList from "@/features/tickets/TicketList";
import Section from "@/layouts/Section";
import { Redirect } from "wouter";

export default function Home() {
  const auth = useAuthStore((state) => state.auth);
  if (!auth?.isValid) return <Redirect to="/login" />;

  return (
    <Section className="bg-background p-2">
      <h1 className="">Home</h1>
      <TicketList />
    </Section>
  );
}
