import useTicketStore from "./useTicketStore";
import { MessageProps } from "@/components/conversation/MessageItem";
import useAuthStore from "../auth/useAuthStore";
import useSubscribeMessages from "../messages/useSubscribeMessages";
import Chat from "@/components/conversation/Chat";
import { sendMessage } from "@/api/messages";

type Props = {
  ticketId: string;
};

export default function TicketView(props: Props) {
  const { ticketId } = props;
  const tickets = useTicketStore((state) => state.tickets);
  const ticket = tickets.find((t) => t.id === ticketId);

  const auth = useAuthStore((state) => state.auth);
  const { messages } = useSubscribeMessages(ticketId);

  if (!ticket) return null;

  const customerEmail = ticket.expand?.customer_id?.email || "unknown";

  const conversation: MessageProps[] = messages.map((message) => {
    const isAgent = message.agent_id === auth?.record?.id;
    const sender = message.customer_id
      ? customerEmail === auth?.record?.email
        ? "You"
        : customerEmail
      : isAgent
        ? "You"
        : "Other Agent";

    return {
      align: message.agent_id === auth?.record?.id ? "end" : "start",
      ...message,
      sender,
    };
  });

  const mergeTicketMessages: MessageProps[] = [
    {
      align: ticket.customer_id === auth?.record?.id ? "end" : "start",
      ...ticket,
      sender: customerEmail === auth?.record?.email ? "You" : customerEmail,
    },
    ...conversation,
  ];

  async function handleSubmit(formData: { message: string }) {
    if (ticket && auth?.record) {
      const { id, collectionName } = auth.record;
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
      <div className="bg-card top-0 right-0 left-0 z-10 p-2 text-center">
        <h1 className="text-center">Ticket {ticket.id}</h1>
        <span className="text-muted-foreground text-xs">
          Issued {new Date(ticket.created as string).toLocaleString()}
        </span>
      </div>

      <div>
        <Chat
          className="mx-auto max-w-3xl"
          messages={mergeTicketMessages}
          onSubmit={handleSubmit}
          disabledSend={auth?.isSuperuser}
        />
      </div>
    </div>
  );
}
