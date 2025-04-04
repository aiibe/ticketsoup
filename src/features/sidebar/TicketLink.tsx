import { Link } from "wouter";
import useTicketStore from "../tickets/useTicketStore";
import { Badge } from "@/components/ui/badge";

export default function TicketLink() {
  const tickets = useTicketStore((state) => state.tickets);

  return (
    <li>
      <Link
        className="hover:bg-accent flex justify-between rounded-lg px-2 py-1"
        to="/"
      >
        <span>Tickets</span>
        <Badge variant="secondary">{tickets.length}</Badge>
      </Link>
    </li>
  );
}
