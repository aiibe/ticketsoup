import { pb } from "@/lib/db/pocketbase";
import { RecordSubscription } from "pocketbase";
import { useCallback, useEffect } from "react";
import useTicketStore from "./useTicketStore";
import { getAllTickets, TicketExpand } from "@/api/tickets";
import useAuthStore from "../auth/useAuthStore";

export default function useSubscribeTickets() {
  const setTickets = useTicketStore((state) => state.setTickets);
  const addTicket = useTicketStore((state) => state.addTicket);
  const updateTicket = useTicketStore((state) => state.updateTicket);
  const removeTicket = useTicketStore((state) => state.removeTicket);
  const isAuth = useAuthStore((state) => state.auth);

  // Hydrate
  useEffect(() => {
    async function fetchTickets() {
      const { data } = await getAllTickets();
      if (data) {
        setTickets(data);
      }
    }

    if (isAuth) {
      fetchTickets();
    }
  }, [isAuth, setTickets]);

  const callback = useCallback(
    (e: RecordSubscription<TicketExpand>) => {
      if (e.action === "create") {
        addTicket(e.record);
      }

      if (e.action === "delete") {
        removeTicket(e.record.id);
      }

      if (e.action === "update") {
        updateTicket(e.record);
      }
    },
    [addTicket, removeTicket, updateTicket],
  );

  // Subscribe to changes
  useEffect(() => {
    if (!isAuth) return;

    pb.collection("tickets").subscribe("*", callback, {
      expand: "customer_id",
    });

    return () => {
      pb.collection("tickets").unsubscribe();
    };
  }, [callback, isAuth]);
}
