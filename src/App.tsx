import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import TicketPage from "./pages/TicketPage";
import Agents from "./pages/Agents";
import Feedback from "./pages/Feedback";
import useSubscribeTickets from "./features/tickets/useSubscribeTickets";
import useSubscribeAuth from "./features/auth/useSubscribeAuth";
import { useEffect } from "react";
import DiscussionPage from "./pages/DiscussionPage";

function App() {
  useSubscribeAuth();
  useSubscribeTickets();

  useEffect(() => {
    async function test() {}
    test();
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path="/feedback" component={Feedback} />
        <Route path="/discussion/:id" component={DiscussionPage} />
        <Route path="/ticket/:id" component={TicketPage} />
        <Route path="/_admin/agents" component={Agents} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
