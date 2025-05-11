import { pb } from "@/lib/db/pocketbase";
import { RecordSubscription } from "pocketbase";
import { useCallback, useEffect } from "react";
import useAuthStore from "../auth/useAuthStore";
import useAgentStore from "./useAgentStore";
import { Agent, getAllAgents } from "@/api/agents";
import { useCheckRole } from "../auth/useCheckRole";

export default function useSubscribeAgents() {
  const setAgents = useAgentStore((state) => state.setAgents);
  const addAgent = useAgentStore((state) => state.addAgent);
  const removeAgent = useAgentStore((state) => state.removeAgent);
  const updateAgent = useAgentStore((state) => state.updateAgent);
  const isAuth = useAuthStore((state) => state.auth);
  const isCustomer = useCheckRole("customers");

  // Hydrate
  useEffect(() => {
    async function fetchAgents() {
      const { data } = await getAllAgents();
      if (data) {
        setAgents(data);
      }
    }

    if (isAuth && !isCustomer) {
      fetchAgents();
    }
  }, [isAuth, isCustomer, setAgents]);

  const callback = useCallback(
    (e: RecordSubscription<Agent>) => {
      if (e.action === "create") {
        addAgent(e.record);
      }

      if (e.action === "delete") {
        removeAgent(e.record.id);
      }

      if (e.action === "update") {
        updateAgent(e.record);
      }
    },
    [addAgent, removeAgent, updateAgent],
  );

  // Subscribe to changes
  useEffect(() => {
    if (!isAuth) return;

    pb.collection("agents").subscribe("*", callback, {
      expand: "customer_id",
    });

    return () => {
      pb.collection("agents").unsubscribe();
    };
  }, [callback, isAuth]);
}
