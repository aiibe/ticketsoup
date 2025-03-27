import { useEffect } from "react";
import { pb } from "../lib/db/pocketbase";
import { Redirect, Route, RouteProps, useLocation } from "wouter";

export default function AuthRoute(props: RouteProps) {
  const [, navigate] = useLocation();

  // Redirect to login if not logged in
  useEffect(() => {
    pb.authStore.onChange(() => {
      if (!pb.authStore.isValid) {
        navigate("/login");
      }
    });
  }, [navigate]);

  // Redirect to login if not logged in
  if (!pb.authStore.isValid) {
    return <Redirect to="/login" />;
  }

  return <Route {...props} />;
}
