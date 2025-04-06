import useAuthStore from "@/features/auth/useAuthStore";
import Section from "@/layouts/Section";
import { pb } from "@/lib/db/pocketbase";
import { Redirect } from "wouter";

export default function Agents() {
  const isAuth = useAuthStore((state) => state.auth);

  const isAdmin = pb.authStore?.isSuperuser && isAuth;
  if (!isAdmin) return <Redirect to="/" />;

  return (
    <Section>
      <div className="p-2">
        <h1>Agents</h1>
      </div>
    </Section>
  );
}
