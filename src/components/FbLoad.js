import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
//import { Customer } from "./Customer";
import { Redirect } from "react-router-dom";
export default class FbLoad extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
    loginstate: false
    // data:""
  };
  responseFacebook = response => {
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      loginstate: true,
      //data:"yes",
      picture: response.picture.data.url
    });
  };
  componentClicked = () => console.log("clicked");
  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      // fbContent = (
      //   <div
      //     style={{
      //       width: "400px",
      //       margin: "auto",
      //       background: "#f4f4f4",
      //       padding: "20px"
      //     }}
      //   >
      //     <img src={this.state.picture} alt={this.state.name} />
      //     <h2>welcome {this.state.name}</h2>
      //     Email:{this.state.email}
      //   </div>
      // );
      return <Redirect to="/Customer" />;

      // loginstate = true;
      // return <Redirect to="/Customer" />;
    } else {
      fbContent = (
        <FacebookLogin
          appId="997363453953036"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }
    //return <Redirect to="/Customer" />;
    return <div>{fbContent}</div>;
  }
}
