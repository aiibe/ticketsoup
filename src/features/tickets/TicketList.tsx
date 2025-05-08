import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { pb } from "@/lib/db/pocketbase";
import { useCheckRole } from "../auth/useCheckRole";
import { Button } from "@/components/ui/button";
import { TicketStatus } from "./ticket.types";
import { useFilterTickets } from "./useFilterTickets";

type Props = {
  status?: TicketStatus;
  className?: string;
};

export default function TicketList(props: Props) {
  const { className, status } = props;
  const [, navigate] = useLocation();
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
        {isCustomer && status === "open" && (
          <Button size="sm">Create Ticket</Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          className="cursor-pointer px-2 py-1"
          onClick={() => navigate(`/ticket/${ticket.id}`)}
        >
          <CardContent className="flex flex-col gap-2 p-2">
            <div className="border-muted flex items-center justify-between gap-2 border-b pb-2 text-xs">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/identicon/svg?seed=${ticket.expand?.customer_id?.fullName.slice(0, 4)}`}
                  />
                  <AvatarFallback>
                    {ticket.expand?.customer_id?.fullName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <span className="font-bold">
                  {ticket.customer_id === pb.authStore?.record?.id
                    ? "You"
                    : ticket.expand?.customer_id?.fullName || ""}
                </span>
              </div>

              <span className="text-muted-foreground">
                {new Date(ticket.created).toLocaleString()}
              </span>
            </div>

            <div className="whitespace-pre-wrap">{ticket.message}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
