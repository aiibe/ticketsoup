import { cn } from "@/lib/utils";
import { useCheckRole } from "../auth/useCheckRole";
import { TicketStatus } from "./ticket.types";
import { useFilterTickets } from "./useFilterTickets";
import CreateTicketButtonDialog from "./CreateTicketButtonDialog";
import TicketListItem from "./TicketListItem";

type Props = {
  status?: TicketStatus;
  className?: string;
};

export default function TicketList(props: Props) {
  const { className, status } = props;
  const isCustomer = useCheckRole("customers");
  const filteredTickets = useFilterTickets();
  let tickets = filteredTickets.all;

  if (status === "open") {
    tickets = filteredTickets.open;
  } else if (status === "in-progress") {
    tickets = filteredTickets.inProgress;
  } else if (status === "closed") {
    tickets = filteredTickets.closed;
  }

  if (!tickets.length) {
    return (
      <div className="text-muted-foreground m-10 flex flex-col items-center gap-4 text-center">
        <p>No soup to serve for now</p>
        <p className="text-sm italic">There are no tickets yet</p>
        {isCustomer && status === "open" && <CreateTicketButtonDialog />}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {tickets.map((ticket) => (
        <TicketListItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
