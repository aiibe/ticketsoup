import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Layout from "./layouts/Layout";
import AgentLogin from "./pages/AgentLogin";
import AdminLogin from "./pages/AdminLogin";
import Ticket from "./pages/Ticket";
import Agents from "./pages/Agents";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/feedback" component={Feedback} />

        <Route path="/ticket/:id" component={Ticket} />
        <Route path="/_admin/agents" component={Agents} />
        <Route path="/_admin/login" component={AdminLogin} />
        <Route path="/login" component={AgentLogin} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
