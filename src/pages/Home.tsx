import useAuth from "@/hooks/useAuth";
import Section from "@/layouts/Section";
import { Redirect } from "wouter";

export default function Home() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <Section>
      <div className="h-[calc(100vh*2)]">
        <h1 className="">Home</h1>
      </div>
    </Section>
  );
}
