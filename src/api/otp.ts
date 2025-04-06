import { pb } from "@/lib/db/pocketbase";
import {
  ClientResponseError,
  OTPResponse,
  RecordAuthResponse,
} from "pocketbase";

export async function requestOTP(
  collection: "agents" | "customers",
  email: string,
): Promise<{
  error: ClientResponseError["data"] | null;
  data: OTPResponse | null;
}> {
  try {
    const resp = await pb.collection(collection).requestOTP(email);
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

export async function verifyOTP(
  collection: "agents" | "customers",
  otpId: string,
  otp: string,
): Promise<{
  error: ClientResponseError["data"] | null;
  data: RecordAuthResponse | null;
}> {
  try {
    const resp = await pb.collection(collection).authWithOTP(otpId, otp);
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
