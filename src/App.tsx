import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Transactions from "./containers/Transactions";
import Profile from "./containers/Profile";
import Register from "./containers/Register";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function App() {
  const { authState } = React.useContext(AuthContext);

  console.log(authState);

  return <>{authState.isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />}</>;
}

const PublicRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};
const PrivateRoutes = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/transactions">
            <Transactions />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Layout>
      </Switch>
    </Router>
  );
};

export default () => (
  <AuthProvider>
    <App></App>
  </AuthProvider>
);
