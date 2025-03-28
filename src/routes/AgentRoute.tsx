import useAuth from "@/hooks/useAuth";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, RouteProps, Switch } from "wouter";

export default function AgentRoute(props: RouteProps) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <Switch>
      <Route {...props} />
      <Route component={NotFound} />
    </Switch>
  );
}
