import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { Redirect } from "react-router-dom";
export default class FbLoad extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
    loginstate: false
  };
  responseFacebook = response => {
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      loginstate: true,
      picture: response.picture.data.url
    });
  };
  componentClicked = () => console.log("clicked");
  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/Customer" />;
    } else {
      return (
        <div>
          <FacebookLogin
            appId="997363453953036"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook}
          />
        </div>
      );
    }
  }
}
