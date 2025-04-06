import { pb } from "@/lib/db/pocketbase";
import { ClientResponseError } from "pocketbase";

export async function getMessagesByTicketId(ticketId: string) {
  try {
    const resp = await pb.collection("messages").getFullList({
      sort: "created",
      filter: `ticket_id="${ticketId}"`,
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

export async function sendMessage(payload: {
  ticket_id: string;
  message: string;
  customer_id?: string;
  agent_id?: string;
}) {
  try {
    const resp = await pb.collection("messages").create(payload);
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
