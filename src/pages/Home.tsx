import useAuthStore from "@/features/auth/useAuthStore";
import TicketsView from "@/features/tickets/TicketsView";
import { Redirect } from "wouter";

export default function Home() {
  const isAuth = useAuthStore((state) => state.auth);

  if (!isAuth) return <Redirect to="/login" />;

  return <TicketsView />;
}
