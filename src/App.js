import React from "react";
import "./App.css";
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";
import { Customer } from "./components/Customer";
import { Navigation } from "./components/Navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
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
}
export default App;
