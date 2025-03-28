import useAuthStore from "@/features/auth/useAuthStore";
import Section from "@/layouts/Section";
import { Redirect } from "wouter";

export default function Agents() {
  const auth = useAuthStore((state) => state.auth);

  const isAdmin = auth?.isSuperuser && auth?.isValid;
  if (!isAdmin) return <Redirect to="/" />;

  return (
    <Section>
      <div className="p-2">
        <h1>Agents</h1>
      </div>
    </Section>
  );
}
