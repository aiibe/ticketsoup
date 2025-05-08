import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import useAuthStore from "@/features/auth/useAuthStore";
import { useCheckRole } from "@/features/auth/useCheckRole";
import { ClosedTickets } from "@/features/tickets/tabs/content/ClosedTickets";
import { InProgressTickets } from "@/features/tickets/tabs/content/InProgressTickets";
import { OpenTickets } from "@/features/tickets/tabs/content/OpenTickets";
import { TabList } from "@/features/tickets/tabs/TabList";
import { Redirect } from "wouter";

export default function Home() {
  const isAuth = useAuthStore((state) => state.auth);
  const isCustomer = useCheckRole("customers");

  if (!isAuth) return <Redirect to="/login" />;

  return (
    <section className="grid w-full grid-cols-12 gap-2">
      <div className="col-span-10 col-start-2 py-4 md:col-span-6 md:col-start-4">
        <div className="mb-4">
          <div className="flex justify-between">
            <h1 className="mb-4 text-2xl font-bold">Tickets</h1>
            {isCustomer && <Button size="sm">Create Ticket</Button>}
          </div>

          <Tabs defaultValue="open" className="w-full">
            {/* Tabs */}
            <TabList />

            {/* Content */}
            <OpenTickets />
            <InProgressTickets />
            <ClosedTickets />
          </Tabs>
        </div>
      </div>
    </section>
  );
}
