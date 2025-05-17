import useAuthStore from "@/features/auth/useAuthStore";
import { pb } from "@/lib/db/pocketbase";
import { Redirect } from "wouter";

export default function Agents() {
  const isAuth = useAuthStore((state) => state.auth);

  const isAdmin = pb.authStore?.isSuperuser && isAuth;
  if (!isAdmin) return <Redirect to="/" />;

  return <h1>Agents</h1>;
}
