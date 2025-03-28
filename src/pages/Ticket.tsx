import useAuth from "@/hooks/useAuth";
import Section from "@/layouts/Section";
import { Redirect, useParams } from "wouter";

export default function Ticket() {
  const { id } = useParams<{ id: string }>();

  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <Section>
      <div>Ticket {id}</div>
    </Section>
  );
}
