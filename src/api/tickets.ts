import { pb } from "@/lib/db/pocketbase";
import { CustomersRecord, TicketsResponse } from "@/lib/db/pocketbase-types";
import { ClientResponseError } from "pocketbase";
import { nanoid } from "nanoid";
import { getCustomerByEmail } from "./customers";

export type TicketExpand = TicketsResponse<{
  customer_id: CustomersRecord;
}>;

export async function getAllTickets(): Promise<{
  error: ClientResponseError["data"] | null;
  data: TicketExpand[] | null;
}> {
  try {
    const resp = await pb.collection<TicketExpand>("tickets").getFullList({
      sort: "-created",
      expand: "customer_id",
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

export async function createFeedback(payload: {
  email: string;
  message: string;
}): Promise<{
  error: ClientResponseError["data"] | null;
  data: TicketExpand | null;
}> {
  try {
    // Check if customer already exists
    let { data: customer } = await getCustomerByEmail(payload.email);

    // Create new customer
    if (!customer) {
      const password = nanoid(15);
      customer = await pb.collection("customers").create({
        password: password,
        passwordConfirm: password,
        email: payload.email,
        emailVisibility: true,
        verified: true,
      });
    }

    // Create new ticket
    const ticket = await pb.collection<TicketExpand>("tickets").create({
      customer_id: (customer as CustomersRecord).id,
      assigned_to: null,
      message: payload.message,
    });
    return {
      error: null,
      data: ticket,
    };
  } catch (error) {
    return {
      error: (error as ClientResponseError).data,
      data: null,
    };
  }
}
