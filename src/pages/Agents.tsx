import useAuth from "@/hooks/useAuth";
import Section from "@/layouts/Section";
import { Redirect } from "wouter";

export default function Agents() {
  const { isLoggedIn, isSuperUser } = useAuth();
  const isAdmin = isLoggedIn && isSuperUser;
  if (!isAdmin) return <Redirect to="/" />;

  return (
    <Section>
      <div className="p-2">
        <h1>Agents</h1>
      </div>
    </Section>
  );
}
