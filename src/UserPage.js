import React, { Component } from "react";
import axios from "axios";
import MainUserCard from "./MainUserCard.js";
import MatchModal from "./MatchModal.js";
import { List } from "antd";
import "antd/dist/antd.css";

//figure out how to have the user upload a picture
//figure out how to get people that liked you to the front of your queue

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      potentialMatches: [
        {
          user_firstname: "",
          user_bio: "",
          user_distance: 0
        }
      ],
      showMatchPop: false,
      outOfMatches: false,
      trueMatches: []
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleMatchClose = this.handleMatchClose.bind(this);
    this.getMatches = this.getMatches.bind(this);
    this.displayMatches = this.displayMatches.bind(this);
  }
  getMatches() {
    let passedInfo = {
      my_latitude: parseFloat(this.props.location.state.user_latitude),
      my_longitude: parseFloat(this.props.location.state.user_longitude),
      my_username: this.props.location.state.user_username,
      my_sex: this.props.location.state.user_sex
    };
    axios
      .post("/getpotentialmatches", passedInfo)
      .then(response => {
        console.log(response);
        if (this.state.potentialMatches[0].user_firstname == "") {
          this.setState({
            potentialMatches: response.data
          });
        } else {
          this.setState(prevState => ({
            potentialMatches: prevState.potentialMatches.concat(response.data)
          }));
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  displayMatches() {
    let bodyInfo = { our_username: this.props.location.state.user_username };
    axios.post("/getUserMatches", bodyInfo).then(response => {
      console.log(response.data);
      this.setState({
        trueMatches: response.data
      });
    });
  }

  componentDidMount() {
    console.log("component did mount is working");
    this.getMatches();
    this.displayMatches();
  }

  handleLike = event => {
    //first check if the two are matches
    let checkData = {
      other_username: this.state.potentialMatches[0].user_username,
      our_username: this.props.location.state.user_username
    };
    let checkDataReverse = {
      our_username: this.state.potentialMatches[0].user_username,
      other_username: this.props.location.state.user_username
    };
    axios
      .post("/checkIfMatch", checkData)
      .then(response => {
        console.log(response);
        if (response.data == "match") {
          axios
            .post("/addingMatches", checkData)
            .then(response => {
              console.log(response);
              this.displayMatches();
            })
            .catch(err => {
              console.log(err);
            });
          axios
            .post("/addingMatches", checkDataReverse)
            .then(response => {
              console.log(response);
            })
            .catch(err => {
              console.log(err);
            });
          this.setState({
            showMatchPop: true
          });
        } else {
          console.log("this adding liked clause is called");
          axios
            .post("/addingLiked", checkData)
            .then(response => {
              console.log(response);
              this.handleMatchClose();
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDislike = event => {
    let dislikeData = {
      other_username: this.state.potentialMatches[0].user_username,
      our_username: this.props.location.state.user_username
    };
    axios
      .post("/addingDislikedBy", dislikeData)
      .then(response => {
        console.log(response);
        axios
          .post("/addingSeenDisliked", dislikeData)
          .then(response => {
            console.log(response);
            this.handleMatchClose();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleMatchClose = () => {
    this.displayMatches();
    if (this.state.potentialMatches.length == 2) {
      this.getMatches();
    }
    if (this.state.potentialMatches.length == 1) {
      this.setState({
        outOfMatches: true
      });
      return;
    }
    let tempArray = [...this.state.potentialMatches];
    tempArray.splice(0, 1);
    this.setState({
      showMatchPop: false,
      potentialMatches: tempArray
    });
  };

  render() {
    // console.log(this.state.potentialMatches[0]);
    // console.log(this.state.potentialMatches.length);
    // console.log(this.state.outOfMatches);
    const userInfo = this.props.location.state;
    const matchElements = this.state.trueMatches.filter(
      element => element.Matched != "" && element.Matched != " "
    );

    console.log(matchElements);
    return (
      <div>
        {this.state.outOfMatches ? (
          <div style={{ textAlign: "center", border: "solid black 2px" }}>
            <h1>
              You've seen everyone in your area! Check back later for more
            </h1>
          </div>
        ) : (
          <div>
            <MainUserCard
              userInfo={userInfo}
              potentialMatches={this.state.potentialMatches}
              handleDislike={this.handleDislike}
              handleLike={this.handleLike}
            />
            <MatchModal
              showMatchPop={this.state.showMatchPop}
              potentialMatches={this.state.potentialMatches}
              handleMatchClose={this.handleMatchClose}
            />
            <br></br>
            <br></br>
            <div
              style={{
                height: "100vh",
                width: "400px",
                position: "relative",
                borderRight: "solid 1px",
                borderColor: "Gainsboro",
                bottom: "1000px",
                left: "0",
                fontFamily: "Didact Gothic, sans-serif"
              }}
            >
              <h1 style={{ textAlign: "center" }}>Match Queue</h1>
              <List
                style={{ position: "relative", top: "30px" }}
                bordered
                dataSource={matchElements}
                renderItem={item => <List.Item>{item.Matched}</List.Item>}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
