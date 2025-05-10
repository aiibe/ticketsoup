import { pb } from "@/lib/db/pocketbase";
import useAuthStore from "./useAuthStore";

export function useCheckRole(role: "_superusers" | "agents" | "customers") {
  const isAuth = useAuthStore((state) => state.auth);
  if (!pb.authStore?.record) return false;
  return role === pb.authStore.record.collectionName && isAuth;
}
