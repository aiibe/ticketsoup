import { Tabs } from "@/components/ui/tabs";
import { TabList } from "./tabs/TabList";
import { OpenTickets } from "./tabs/content/OpenTickets";
import { InProgressTickets } from "./tabs/content/InProgressTickets";
import { ClosedTickets } from "./tabs/content/ClosedTickets";
import { Roles, useCheckRoles } from "../auth/useCheckRoles";
import CreateTicketButtonDialog from "./CreateTicketButtonDialog";

export default function TicketsView() {
  const isCustomer = useCheckRoles([Roles.Customers]);

  return (
    <div className="mb-4">
      <div className="mb-4 flex justify-between">
        <h1 className="text-xl font-semibold">Tickets</h1>
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
