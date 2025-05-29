import { pb } from "@/lib/db/pocketbase";
import { AgentsResponse } from "@/lib/db/pocketbase-types";
import { nanoid } from "nanoid";
import { ClientResponseError } from "pocketbase";

export type Agent = AgentsResponse;

/**
 * Get all agents
 */
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

/**
 * Create and invite new agent
 */
export async function createAgent(payload: {
  fullName: string;
  email: string;
}) {
  // Generate random password
  const password = nanoid(15);

  try {
    const resp = await pb.collection("agents").create({
      ...payload,
      password,
      passwordConfirm: password,
      verified: true,
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

/**
 * Remove agent
 */
export async function removeAgent(id: string) {
  try {
    const resp = await pb.collection("agents").delete(id);
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
