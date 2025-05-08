import { TabsContent } from "@/components/ui/tabs";
import TicketList from "@/features/tickets/TicketList";
import { TicketStatus } from "../../ticket.types";

export function ClosedTickets() {
  return (
    <TabsContent value="closed">
      <TicketList className="mt-2" status={TicketStatus.CLOSED} />
    </TabsContent>
  );
}
