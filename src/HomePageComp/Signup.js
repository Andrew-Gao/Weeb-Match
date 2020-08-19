import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "/Users/hongchen/WeebTinder/client/src/App.css";
import "antd/dist/antd.css";
import { Input, Button } from "antd";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      passwordInput: "",
      emailInput: "",
      firstnameInput: "",
      lastnameInput: "",
      latitudeInput: "",
      longitudeInput: "",
      sexInput: "",
      bioInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  handleChange = caller => event => {
    switch (caller) {
      case 0:
        this.setState({
          usernameInput: event.target.value
        });
        break;
      case 1:
        this.setState({
          passwordInput: event.target.value
        });
        break;
      case 2:
        this.setState({
          emailInput: event.target.value
        });
        break;
      case 3:
        this.setState({
          firstnameInput: event.target.value
        });
        break;
      case 4:
        this.setState({
          lastnameInput: event.target.value
        });
        break;
      case 5:
        this.setState({
          sexInput: event.target.value.toUpperCase()
        });
        break;
      case 6:
        this.setState({
          bioInput: event.target.value
        });
        break;
    }
  };

  getLocation() {
    navigator.geolocation.getCurrentPosition(this.getCoordinates);
  }

  async getCoordinates(position) {
    console.log(position.coords.latitude);
    await this.setState(
      {
        latitudeInput: position.coords.latitude,
        longitudeInput: position.coords.longitude
      },
      this.handleSubmit
    );
  }

  handleSubmit() {
    if (
      this.state.usernameInput.length == 0 ||
      this.state.passwordInput.length == 0 ||
      this.state.emailInput.length == 0 ||
      this.state.firstnameInput.length == 0 ||
      this.state.lastnameInput.length == 0 ||
      this.state.sexInput.length == 0 ||
      this.state.bioInput.length == 0
    ) {
      alert("Forms cannot be empty");
      return;
    } else {
      console.log(this.state.latitudeInput);
      console.log(this.state.longitudeInput);
      let userInfo = {
        user_username: this.state.usernameInput,
        user_password: this.state.passwordInput,
        user_email: this.state.emailInput,
        user_firstname: this.state.firstnameInput,
        user_lastname: this.state.lastnameInput,
        user_latitude: this.state.latitudeInput,
        user_longitude: this.state.longitudeInput,
        user_sex: this.state.sexInput,
        user_bio: this.state.bioInput
      };
      //post request to add the user to the main authentication table
      axios
        .post("/createuser", userInfo)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      //post request to create the user's own table
      axios
        .post("/createusertable", { user_username: this.state.usernameInput })
        .then(response => {
          console.log(response);
          this.props.history.push({
            pathname: "/app",
            state: {
              user_username: this.state.usernameInput,
              user_password: this.state.passwordInput,
              user_email: this.state.emailInput,
              user_firstname: this.state.firstnameInput,
              user_lastname: this.state.lastnameInput,
              user_latitude: this.state.latitudeInput,
              user_longitude: this.state.longitudeInput,
              user_sex: this.state.sexInput,
              user_bio: this.state.bioInput
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  //routing to the /app main user page

  render() {
    const { TextArea } = Input;
    return (
      <div className="SignUpBox">
        <div className="mainBox">
          <h3 className="createAccount" style={{ textAlign: "center" }}>
            Create Account
          </h3>
          <p style={{ textAlign: "center" }}>Fill in the blanks below</p>

          <form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
            <Input
              placeholder="username"
              onChange={this.handleChange(0)}
              type="text"
              value={this.state.usernameInput}
              style={{ width: 200 }}
            />
            <br></br>
            <Input
              placeholder="password"
              onChange={this.handleChange(1)}
              type="text"
              value={this.state.passwordInput}
              style={{ width: 200 }}
            />
            <br></br>
            <Input
              placeholder="abc123@hotmail.com"
              onChange={this.handleChange(2)}
              type="text"
              value={this.state.emailInput}
              style={{ width: 200 }}
            />
            <br></br>
            <Input
              placeholder="John"
              onChange={this.handleChange(3)}
              type="text"
              value={this.state.firstnameInput}
              style={{ width: 200 }}
            />
            <br></br>
            <Input
              placeholder="Smith"
              onChange={this.handleChange(4)}
              type="text"
              value={this.state.lastnameInput}
              style={{ width: 200 }}
            />
            <br></br>
            <Input
              placeholder="Sex: M or F"
              onChange={this.handleChange(5)}
              type="text"
              value={this.state.sexInput}
              style={{ width: 200 }}
            />
            <br></br>

            <br></br>
            <TextArea
              placeholder="Write something about yourself here!"
              onChange={this.handleChange(6)}
              value={this.state.bioInput}
              rows={4}
              style={{ width: 300 }}
            />
            <br></br>

            <br></br>

            <Button type="Default" onClick={this.getLocation}>
              Submit
            </Button>

            {/* <button type = "submit">Submit</button> */}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
