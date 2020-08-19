import React, { Component } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export default class MainUserCard extends Component {
  constructor(props) {
    super(props);
    console.log("youre in the child component");
  }

  render() {
    console.log(this.props.userInfo.user_firstname);
    console.log(this.props.potentialMatches);
    return (
      <div style={{ fontFamily: "Didact Gothic, sans-serif" }}>
        <div
          style={{
            width: "400px",
            borderRight: "solid 1px",
            borderColor: "Gainsboro",
            height: "100px"
          }}
        >
          <header
            style={{
              position: "relative",
              left: "10px",
              top: "10px"
            }}
          >{`${this.props.userInfo.user_firstname} ${this.props.userInfo.user_lastname}`}</header>
        </div>
        <br></br>
        <h1
          style={{
            textAlign: "center",
            position: "relative",
            bottom: "100px",
            left: "190px"
          }}
        >
          WeebMatch
        </h1>

        <div style={{ position: "relative", left: "840px" }}>
          <img
            src="https://images.discerningassets.com/image/upload/q_auto:best/c_limit,h_1000,w_1000/v1483649522/Ana_Sofia_Final_web_qyhk3i.jpg"
            width="360"
            height="500"
            style={{ borderRadius: "5px", boxShadow: "5px 5px 5px" }}
          />
          <h1
            style={{
              position: "relative",
              left: "16px",
              bottom: "120px",
              color: "white",
              padding: "0px"
            }}
          >
            {this.props.potentialMatches[0].user_firstname}
          </h1>
          <div>
            <p
              style={{
                position: "relative",
                left: "18px",
                bottom: "130px",
                color: "white",
                padding: "0px",
                wordBreak: "normal",
                whiteSpace: "normal",
                fontSize: "13px"
              }}
            >
              {`${parseInt(this.props.potentialMatches[0].distance)}`} miles
              away
            </p>
          </div>
          <div style={{ width: "320px", height: "200px" }}>
            <p
              style={{
                position: "relative",
                left: "18px",
                bottom: "145px",
                color: "white",
                padding: "0px",
                wordBreak: "normal",
                whiteSpace: "normal"
              }}
            >
              {this.props.potentialMatches[0].user_bio}
            </p>
          </div>
        </div>
        {/* <div class="container">
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
        </div> */}

        <br></br>

        <div style={{ position: "relative", left: "965px", bottom: "280px" }}>
          <button
            style={{ boxShadow: "none", border: "none", lineHeight: "initial" }}
            onClick={this.props.handleDislike}
          >
            <CloseCircleOutlined style={{ fontSize: "40px" }} />
          </button>
          <button
            style={{ boxShadow: "none", border: "none", lineHeight: "initial" }}
            onClick={this.props.handleLike}
          >
            <CheckCircleOutlined style={{ fontSize: "40px" }} />
          </button>
        </div>
      </div>
    );
  }
}
