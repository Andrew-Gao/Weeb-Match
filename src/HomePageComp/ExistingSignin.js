import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "/Users/hongchen/WeebTinder/client/src/App.css";
import { Input, Button } from "antd";
import "antd/dist/antd.css";

class ExistingSignin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      passwordInput: "",
      returnedfirstname: "",
      updatedLatitude: "",
      updatedLongitude: "",
      errorLogIn: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  async getCoordinates(position) {
    console.log(position.coords.latitude);
    this.setState(
      {
        updatedLatitude: position.coords.latitude,
        updatedLongitude: position.coords.longitude,
      },
      this.handleSubmit
    );
  }

  handleChange = (caller) => (event) => {
    switch (caller) {
      case 0:
        this.setState({
          usernameInput: event.target.value,
        });
        break;
      case 1:
        this.setState({
          passwordInput: event.target.value,
        });
        break;
    }
  };

  handleSubmit() {
    // event.preventDefault()
    console.log(this.state.updatedLatitude);
    console.log(this.state.updatedLongitude);
    if (
      this.state.usernameInput.length == 0 ||
      this.state.passwordInput.length == 0
    ) {
      alert("Forms cannot be empty");
      return;
    }
    let userInfo = {
      user_username: this.state.usernameInput,
      user_password: this.state.passwordInput,
    };
    axios
      .post("/signin", userInfo)
      .then((response) => {
        if (
          response.data !=
          "User does not exist or User/Password combo incorrect"
        ) {
          let updatePosition = {
            user_latitude: this.state.updatedLatitude,
            user_longitude: this.state.updatedLongitude,
            user_username: this.state.usernameInput,
          };
          axios
            .put("./updateposition", updatePosition)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            })
            .then(
              this.props.history.push({
                pathname: "/app",
                state: response.data[0],
              })
            );
        } else {
          console.log(response.data);
          this.setState(
            {
              errorLogIn:
                "User does not exist or User/Password combo incorrect",
            },
            () => {
              return;
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="SignUpBox">
        <div className="existingSignInMain">
          <h3 style={{ textAlign: "center" }}>Sign In</h3>

          <p style={{ textAlign: "center" }}>{this.state.errorLogIn}</p>
          <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
            <Input
              placeholder="username"
              onChange={this.handleChange(0)}
              type="text"
              value={this.state.usernameInput}
              size="large"
              style={{ width: 200 }}
            />{" "}
            <br></br>
            <Input
              placeholder="password"
              onChange={this.handleChange(1)}
              type="text"
              value={this.state.passwordInput}
              size="large"
              style={{ width: 200 }}
            />{" "}
            <br></br>
            <br></br>
            <br></br>
            <Button type="Default" onClick={this.getLocation}>
              Log In
            </Button>{" "}
            <br></br>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(ExistingSignin);
