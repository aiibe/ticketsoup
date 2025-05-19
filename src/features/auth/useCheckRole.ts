import { pb } from "@/lib/db/pocketbase";
import useAuthStore from "./useAuthStore";

export enum Roles {
  Admins = "_superusers",
  Agents = "agents",
  Customers = "customers",
}

export function useCheckRole(role: Roles) {
  const isAuth = useAuthStore((state) => state.auth);
  if (!pb.authStore?.record) return false;
  return role === pb.authStore.record.collectionName && isAuth;
}
