import useAuthStore from "@/features/auth/useAuthStore";
import TicketList from "@/features/tickets/TicketList";
import Section from "@/layouts/Section";
import { Redirect } from "wouter";

export default function Home() {
  const isAuth = useAuthStore((state) => state.auth);
  if (!isAuth) return <Redirect to="/login" />;

  return (
    <Section className="bg-background p-2">
      <TicketList />
    </Section>
  );
}
