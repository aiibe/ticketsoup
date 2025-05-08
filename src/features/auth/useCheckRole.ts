import { pb } from "@/lib/db/pocketbase";

export function useCheckRole(role: "_superusers" | "agents" | "customers") {
  if (!pb.authStore?.record) return false;
  return role === pb.authStore.record.collectionName;
}
