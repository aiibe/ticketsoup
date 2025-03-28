import { pb } from "@/lib/db/pocketbase";
import { ClientResponseError } from "pocketbase";

export async function getCustomerByEmail(email: string) {
  try {
    const resp = await pb
      .collection("customers")
      .getFirstListItem(`email="${email}"`);
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
