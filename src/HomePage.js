import React, { Component } from "react";
import Signup from "./HomePageComp/Signup";
import ExistingSignin from "./HomePageComp/ExistingSignin";
import { Button } from "antd";
import "antd/dist/antd.css";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInClicked: false,
      buttonState: "Sign In"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let buttonString = "";
    if (this.state.signInClicked) {
      buttonString = "Sign In";
    } else {
      buttonString = "Back";
    }
    this.setState(prevState => ({
      signInClicked: !prevState.signInClicked,
      buttonState: buttonString
    }));
  }

  render() {
    return (
      <div className="App">
        <header
          style={{
            fontSize: "25px",
            fontFamily: "Didact Gothic, sans-serif",
            paddingLeft: "20px",
            paddingTop: "15px"
          }}
        >
          WeebMatch
        </header>
        <header className="App-header">
          {this.state.signInClicked ? <ExistingSignin /> : <Signup />}

          <div
            style={{
              position: "absolute",
              top: "3%",
              left: "92%"
            }}
          >
            <Button onClick={this.handleClick} type="Default">
              {this.state.buttonState}
            </Button>
          </div>
        </header>
      </div>
    );
  }
}
