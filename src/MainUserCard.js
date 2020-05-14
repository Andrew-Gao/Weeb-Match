import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default class MainUserCard extends Component {
  constructor(props) {
    super(props);
    console.log("youre in the child component");
    // this.props.handleLike = this.props.handleLike.bind(this.props.handleLike)
    // this.props.handleDisike = this.props.handleDislike.bind(this.props.handleDislike)
  }

  render() {
    console.log(this.props.userInfo.user_firstname);
    console.log(this.props.potentialMatches);
    return (
      <div>
        <h1
          style={{ textAlign: "center" }}
        >{`Welcome, ${this.props.userInfo.user_firstname} ${this.props.userInfo.user_lastname}!`}</h1>
        <br></br>
        <div class="container">
          <div class="row">
            <div class="col-12 mt-3">
              <div class="card">
                <div
                  class="card-horizontal"
                  style={{ display: "flex", flex: "1 1 auto" }}
                >
                  <div class="img-square-wrapper">
                    <img
                      class="image"
                      src={"https://picsum.photos/200"}
                      alt="Card image cap"
                      style={{ width: "300px", height: "auto" }}
                    />
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">
                      {this.props.potentialMatches[0].user_firstname}
                    </h4>
                    <p class="card-text">
                      {this.props.potentialMatches[0].user_bio}
                    </p>
                  </div>
                </div>
                <div class="card-footer">
                  <small class="text-muted">{`${parseInt(
                    this.props.potentialMatches[0].distance
                  )} miles away`}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div style={{ width: "15%", margin: "0 auto" }}>
          <button>
            <img
              src="https://cdn2.iconfinder.com/data/icons/social-productivity-line-art-1/128/close-cancel-512.png"
              alt="my image"
              width="75"
              height="75"
              onClick={this.props.handleDislike}
            />
          </button>
          <button>
            <img
              src="https://cdn0.iconfinder.com/data/icons/e-commerce-207/1024/heart-512.png"
              alt="my image"
              width="75"
              height="75"
              onClick={this.props.handleLike}
            />
          </button>
        </div>
      </div>
    );
  }
}
