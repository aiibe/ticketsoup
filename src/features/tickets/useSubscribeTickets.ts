import { pb } from "@/lib/db/pocketbase";
import { RecordSubscription } from "pocketbase";
import { useCallback, useEffect } from "react";
import useTicketStore from "./useTicketStore";
import { getAllTickets, TicketExpand } from "@/api/tickets";

export default function useSubscribeTickets() {
  const setTickets = useTicketStore((state) => state.setTickets);
  const addTicket = useTicketStore((state) => state.addTicket);
  const removeTicket = useTicketStore((state) => state.removeTicket);

  // Hydrate
  useEffect(() => {
    async function fetchTickets() {
      const { data } = await getAllTickets();
      if (data) setTickets(data);
    }
    fetchTickets();
  }, [setTickets]);

  const callback = useCallback(
    (e: RecordSubscription<TicketExpand>) => {
      if (e.action === "create") {
        addTicket(e.record);
      }

      if (e.action === "delete") {
        removeTicket(e.record.id);
      }
    },
    [addTicket, removeTicket],
  );

  // Subscribe to changes
  useEffect(() => {
    pb.collection("tickets").subscribe("*", callback, {
      expand: "customer_id",
    });
    return () => {
      pb.collection("tickets").unsubscribe();
    };
  }, [callback]);
}
