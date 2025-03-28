import { Link } from "wouter";
import useTicketStore from "../tickets/useTicketStore";

export default function TicketLink() {
  const tickets = useTicketStore((state) => state.tickets);

  return (
    <li>
      <Link className="hover:bg-accent flex rounded-lg px-2 py-1" to="/">
        Tickets ({tickets.length})
      </Link>
    </li>
  );
}
