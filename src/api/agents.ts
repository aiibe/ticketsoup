import { pb } from "@/lib/db/pocketbase";
import { AgentsResponse } from "@/lib/db/pocketbase-types";
import { ClientResponseError } from "pocketbase";

export type Agent = AgentsResponse;

export async function getAllAgents(): Promise<{
  error: ClientResponseError["data"] | null;
  data: Agent[] | null;
}> {
  try {
    const resp = await pb.collection<Agent>("agents").getFullList({
      sort: "fullName",
    });
    return {
      error: null,
      data: resp,
    };
  } catch (error) {
    return {
      error: (error as ClientResponseError).data,
      data: null,
    };
  }
}
