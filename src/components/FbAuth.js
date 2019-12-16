import React, { Component } from "react";
import FbLoad from "./FbLoad";

export class FbAuth extends Component {
  render() {
    return (
      <div className="container">
        <h5 className="m-3 d-flex justify-content-center">
          Customer Management Portal
        </h5>
        <p className="App-Intro">
          To Add/Update/Delete Customers,authenticate with Facebook.
        </p>
        <FbLoad />
      </div>
    );
  }
}
