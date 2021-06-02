import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Transactions from "./containers/Transactions";
import Profile from "./containers/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/home">
          <Layout>
            <Home />
          </Layout>
        </Route>
        <Route path="/transactions">
          <Layout>
            <Transactions />
          </Layout>
        </Route>
        <Route path="/profile">
          <Layout>
            <Profile />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
