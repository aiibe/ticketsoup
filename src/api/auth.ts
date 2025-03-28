import { pb } from "@/lib/db/pocketbase";
import { AgentsRecord } from "@/lib/db/pocketbase-types";
import {
  ClientResponseError,
  OTPResponse,
  RecordAuthResponse,
} from "pocketbase";

export async function requestAgentOTP(email: string): Promise<{
  error: ClientResponseError["data"] | null;
  data: OTPResponse | null;
}> {
  try {
    const resp = await pb.collection("agents").requestOTP(email);
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

export async function verifyAgentOTP(
  otpId: string,
  otp: string,
): Promise<{
  error: ClientResponseError["data"] | null;
  data: RecordAuthResponse<AgentsRecord> | null;
}> {
  try {
    const resp = await pb
      .collection<AgentsRecord>("agents")
      .authWithOTP(otpId, otp);
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
