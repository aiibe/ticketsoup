import AgentList from "@/features/agents/AgentList";
import useAuthStore from "@/features/auth/useAuthStore";
import { pb } from "@/lib/db/pocketbase";
import { Redirect } from "wouter";

export default function AgentsPage() {
  const isAuth = useAuthStore((state) => state.auth);

  const isAdmin = pb.authStore?.isSuperuser && isAuth;
  if (!isAdmin) return <Redirect to="/" />;

  return <AgentList />;
}
