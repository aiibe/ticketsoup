import { pb } from "../lib/db/pocketbase";
import { Redirect, Route } from "wouter";
import Login from "../pages/Login";

export default function LoginRoute() {
  // Redirect to home if logged in
  if (pb.authStore.isValid) {
    return <Redirect to="/" />;
  }

  return <Route path="/login" component={Login} />;
}
