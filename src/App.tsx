import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuthRoute from "./routes/AuthRoute";
import LoginRoute from "./routes/LoginRoute";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <AuthRoute path="/" component={Home} />
        <LoginRoute />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
