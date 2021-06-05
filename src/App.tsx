import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Transactions from "./containers/Transactions";
import Profile from "./containers/Profile";
import Register from './containers/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
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
