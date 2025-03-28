import { getMessagesByTicketId } from "@/api/messages";
import { pb } from "@/lib/db/pocketbase";
import { MessagesRecord } from "@/lib/db/pocketbase-types";
import { RecordSubscription } from "pocketbase";
import { useCallback, useEffect, useState } from "react";

export default function useSubscribeMessages(ticketId: string) {
  const [messages, setMessages] = useState<MessagesRecord[]>([]);

  // Hydrate messages
  useEffect(() => {
    async function fetchMessages() {
      if (!ticketId) return;
      const { data } = await getMessagesByTicketId(ticketId);
      if (data) setMessages(data);
    }
    fetchMessages();
  }, [ticketId]);

  const callback = useCallback((e: RecordSubscription<MessagesRecord>) => {
    if (e.action === "create") {
      setMessages((prev) => [...prev, e.record]);
    }

    if (e.action === "delete") {
      setMessages((prev) => prev.filter((m) => m.id !== e.record.id));
    }
  }, []);

  // Subscribe to changes
  useEffect(() => {
    pb.collection("messages").subscribe("*", callback);
    return () => {
      pb.collection("messages").unsubscribe();
    };
  }, [callback]);

  return {
    messages,
  };
}
