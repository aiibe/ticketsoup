import { Tabs } from "@/components/ui/tabs";
import { TabList } from "./tabs/TabList";
import { OpenTickets } from "./tabs/content/OpenTickets";
import { InProgressTickets } from "./tabs/content/InProgressTickets";
import { ClosedTickets } from "./tabs/content/ClosedTickets";
import { useCheckRole } from "../auth/useCheckRole";
import CreateTicketButtonDialog from "./CreateTicketButtonDialog";

export default function TicketsView() {
  const isCustomer = useCheckRole("customers");

  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold">Tickets</h1>
        {isCustomer && <CreateTicketButtonDialog />}
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
  );
}
