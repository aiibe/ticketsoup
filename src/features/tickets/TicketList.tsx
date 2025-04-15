import { Card, CardContent } from "@/components/ui/card";
import useTicketStore from "./useTicketStore";
import { useLocation } from "wouter";

export default function TicketList() {
  const tickets = useTicketStore((state) => state.tickets);

  const [, navigate] = useLocation();

  return (
    <div className="flex flex-col gap-4">
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          className="cursor-pointer px-2 py-1"
          onClick={() => navigate(`/ticket/${ticket.id}`)}
        >
          <CardContent className="p-0">
            <div className="whitespace-pre-wrap">{ticket.message}</div>
            <div className="text-muted-foreground flex gap-2 text-xs">
              <span>{ticket.expand?.customer_id?.fullName || ""}</span>
              <span>{ticket.created}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
