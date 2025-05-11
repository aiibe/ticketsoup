import { Card, CardContent } from "@/components/ui/card";
import { pb } from "@/lib/db/pocketbase";
import { TicketExpand } from "@/api/tickets";
import { useLocation } from "wouter";
import { SelectAssignAgent } from "./SelectAssignAgent";
import UserAvatar from "@/components/UserAvatar";

type Props = {
  ticket: TicketExpand;
};

export default function TicketListItem(props: Props) {
  const { ticket } = props;
  const [, navigate] = useLocation();

  return (
    <Card
      className="cursor-pointer px-2 py-1"
      onClick={() => navigate(`/ticket/${ticket.id}`)}
    >
      <CardContent className="flex flex-col gap-2 p-2">
        <div className="border-muted flex items-center justify-between gap-2 border-b pb-2 text-xs">
          <div className="flex items-center gap-2">
            <UserAvatar name={ticket.expand?.customer_id?.fullName || ""} />

            <span className="font-bold">
              {ticket.customer_id === pb.authStore?.record?.id
                ? "You"
                : ticket.expand?.customer_id?.fullName || ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {new Date(ticket.created).toLocaleString()}
            </span>

            <SelectAssignAgent
              ticketId={ticket.id}
              defaultValue={ticket.assigned_to}
            />
          </div>
        </div>

        <div className="whitespace-pre-wrap">{ticket.message}</div>
      </CardContent>
    </Card>
  );
}
