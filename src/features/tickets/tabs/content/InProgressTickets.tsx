import { TabsContent } from "@/components/ui/tabs";
import TicketList from "@/features/tickets/TicketList";
import { TicketStatus } from "../../ticket.types";

export function InProgressTickets() {
  return (
    <TabsContent value="in-progress">
      <TicketList className="mt-2" status={TicketStatus.IN_PROGRESS} />
    </TabsContent>
  );
}
