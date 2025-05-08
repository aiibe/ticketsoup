import { TabsContent } from "@/components/ui/tabs";
import TicketList from "@/features/tickets/TicketList";
import { TicketStatus } from "../../ticket.types";

export function OpenTickets() {
  return (
    <TabsContent value="open">
      <TicketList className="mt-2" status={TicketStatus.OPEN} />
    </TabsContent>
  );
}
