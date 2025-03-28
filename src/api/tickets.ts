import { pb } from "@/lib/db/pocketbase";
import { TicketsRecord } from "@/lib/db/pocketbase-types";
import { ClientResponseError } from "pocketbase";

export async function createFeedback(payload: {
  email: string;
  message: string;
}): Promise<{
  error: ClientResponseError["data"] | null;
  data: TicketsRecord | null;
}> {
  try {
    const resp = await pb.collection<TicketsRecord>("tickets").create({
      sender: payload.email,
      message: payload.message,
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
