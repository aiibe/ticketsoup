import { Redirect, Route, RouteProps } from "wouter";
import useAuth from "@/hooks/useAuth";

export default function AdminRoute(props: RouteProps) {
  const { isLoggedIn, isSuperUser } = useAuth();
  const isAdmin = isLoggedIn && isSuperUser;

  if (!isAdmin) return <Redirect to="/" />;

  return <Route {...props} />;
}
