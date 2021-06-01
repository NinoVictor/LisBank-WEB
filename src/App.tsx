import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
          <Home></Home>
        </Route>
        <Route path="/transactions">
          <Transactions></Transactions>
        </Route>
        <Route path="/profile">
          <Profile></Profile>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
