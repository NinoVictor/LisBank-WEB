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
        <Route exact path="/" component={Login} />
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
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;
