import useAuthStore from "@/features/auth/useAuthStore";
import TicketsView from "@/features/tickets/TicketsView";
import { Redirect } from "wouter";

export default function Home() {
  const isAuth = useAuthStore((state) => state.auth);

  if (!isAuth) return <Redirect to="/login" />;

  return (
    <section className="grid w-full grid-cols-12 gap-2">
      <div className="col-span-10 col-start-2 py-4 md:col-span-6 md:col-start-4">
        <TicketsView />
      </div>
    </section>
  );
}
