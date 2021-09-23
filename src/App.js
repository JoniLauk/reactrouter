import React, { useState, useEffect, props } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Add from "./components/Add";
import Home from "./components/Home";
import List from "./components/List";
import Login from "./components/Login";

const App = () => {
  const padding = {
    padding: 5,
  };

  return (
    <div className="container">
      <Router>
        <div>
          <Link style={padding} to="/home">
            home
          </Link>
          <Link style={padding} to="/add">
            add
          </Link>
          <Link style={padding} to="/list">
            list
          </Link>
        </div>

        <Switch>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>

        <div>
          <i>Esimerkkivalikko </i>
          <i>perustuu HY:n fullstackopen-kurssimateriaaliin</i>
        </div>
      </Router>
    </div>
  );
};

export default App;
