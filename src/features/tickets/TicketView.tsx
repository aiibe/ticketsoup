import useTicketStore from "./useTicketStore";
import MessageItem, {
  MessageProps,
} from "@/components/conversation/MessageItem";
import useSubscribeMessages from "../messages/useSubscribeMessages";
import Chat from "@/components/conversation/Chat";
import { sendMessage } from "@/api/messages";
import useAuthStore from "../auth/useAuthStore";
import { pb } from "@/lib/db/pocketbase";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Roles, useCheckRoles } from "../auth/useCheckRoles";
import CloseTicketDialog from "./CloseTicketDialog";

type Props = {
  ticketId: string;
};

export default function TicketView(props: Props) {
  const { ticketId } = props;
  const [, navigate] = useLocation();

  const tickets = useTicketStore((state) => state.tickets);
  const ticket = tickets.find((t) => t.id === ticketId);

  const isAuth = useAuthStore((state) => state.auth);
  const canCloseTicket = useCheckRoles([Roles.Agents, Roles.Admins]);

  const { messages, loading: loadingMessages } = useSubscribeMessages(ticketId);

  if (loadingMessages) return null;
  if (!ticket || !isAuth) return null;

  const customerName = ticket.expand?.customer_id?.fullName || "unknown";

  const rootTicket: MessageProps = {
    align: ticket.customer_id === pb.authStore?.record?.id ? "end" : "start",
    ...ticket,
    sender:
      customerName === pb.authStore?.record?.fullName ? "You" : customerName,
  };

  const conversation: MessageProps[] = messages.map((message) => {
    const isAgent = message.agent_id === pb.authStore?.record?.id;
    let sender = customerName;

    if (message.customer_id === pb.authStore?.record?.id) {
      sender = "You";
    }

    if (!message.customer_id) {
      // TODO Replace 'Other Agent' with agent name
      sender = isAgent ? "You" : "Support Team";
    }

    return {
      align: isAgent || sender === "You" ? "end" : "start",
      ...message,
      sender,
    };
  });

  async function handleSubmit(formData: { message: string }) {
    if (ticket && pb.authStore?.record) {
      const { id, collectionName } = pb.authStore.record;
      const isCustomer = collectionName === "customers";

      await sendMessage({
        ticket_id: ticket.id,
        message: formData.message,
        ...(isCustomer && { customer_id: id }),
        ...(!isCustomer && { agent_id: id }),
      });
    }
  }

  return (
    <div className="relative flex flex-col gap-4">
      <div className="top-0 right-0 left-0 z-10">
        <div>
          <div className="flex items-center justify-between">
            <Button size="sm" variant="ghost" onClick={() => navigate("/")}>
              <ChevronLeft /> Back
            </Button>

            {canCloseTicket && !ticket.closed && (
              <CloseTicketDialog ticketId={ticket.id}>
                <Button size="sm" variant="ghost" className="shadow-none">
                  Close ticket
                </Button>
              </CloseTicketDialog>
            )}
          </div>

          <div className="p-2 text-center">
            <h1 className="text-center">Ticket {ticket.id}</h1>
            <span className="text-muted-foreground text-xs">
              Issued {new Date(ticket.created as string).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <MessageItem {...rootTicket} className="w-full" />

        <Chat
          messages={conversation}
          onSubmit={handleSubmit}
          disabledSend={pb.authStore?.isSuperuser}
        />
      </div>
    </div>
  );
}
