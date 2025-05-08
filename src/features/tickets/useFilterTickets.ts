import { TicketExpand } from "@/api/tickets";
import useTicketStore from "./useTicketStore";

type GroupedByStatus = {
  open: TicketExpand[];
  closed: TicketExpand[];
  inProgress: TicketExpand[];
  all: TicketExpand[];
};

export function useFilterTickets() {
  const tickets = useTicketStore((state) => state.tickets);

  const groupedByStatus = tickets.reduce(
    (acc: GroupedByStatus, ticket) => {
      acc.all.push(ticket);
      if (!ticket.closed) {
        if (ticket.assigned_to) {
          acc.inProgress.push(ticket);
        } else {
          acc.open.push(ticket);
        }
      } else {
        acc.closed.push(ticket);
      }
      return acc;
    },
    {
      open: [],
      closed: [],
      inProgress: [],
      all: [],
    },
  );

  return groupedByStatus;
}
