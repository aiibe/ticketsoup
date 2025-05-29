import { Route, Switch } from "wouter";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import TicketPage from "./pages/TicketPage";
import AgentsPage from "./pages/AgentsPage";
import Feedback from "./pages/Feedback";
import useSubscribeTickets from "./features/tickets/useSubscribeTickets";
import useSubscribeAuth from "./features/auth/useSubscribeAuth";
import { useEffect } from "react";
import DiscussionPage from "./pages/DiscussionPage";
import useSubscribeAgents from "./features/agents/useSubscribeAgents";
import AuthLayout from "./layouts/AuthLayout";
import ConfirmAgentPage from "./pages/ConfirmAgentPage";

function App() {
  useSubscribeAuth();
  useSubscribeTickets();
  useSubscribeAgents();

  useEffect(() => {
    async function test() {}
    test();
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path="/confirm-agent/:token?" component={ConfirmAgentPage} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/discussion/:id" component={DiscussionPage} />
        <Route path="/ticket/:id" component={TicketPage} />

        <Route path="/login" component={LoginPage} />
        <AuthLayout>
          <Route path="/_admin/agents" component={AgentsPage} />
          <Route path="/" component={HomePage} />
        </AuthLayout>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
