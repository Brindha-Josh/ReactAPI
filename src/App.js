import React from "react";

import "./App.css";
import { Home } from "./components/Home";
import { Customer } from "./components/Customer";
import { Navigation } from "./components/Navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          React JS with web API Demo
        </h3>
        <h5 className="m-3 d-flex justify-content-center">
          Customer Management Portal
        </h5>
        <Navigation></Navigation>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/customer" component={Customer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
