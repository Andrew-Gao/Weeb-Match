import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import '/Users/hongchen/WeebTinder/client/src/App.css'


class ExistingSignin extends Component{
    constructor(props){
        super(props);
        this.state = {
            usernameInput: '',
            passwordInput: '',
            returnedfirstname : '',
            updatedLatitude: '',
            updatedLongitude: '',
            backendResponse: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCoordinates = this.getCoordinates.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getCoordinates);
          } else {
            alert("Geolocation is not supported by this browser.");
          } 
    }
    
    getCoordinates(position){
        this.setState({
            updatedLatitude : position.coords.latitude,
            updatedLongitude : position.coords.longitude
        })
    }

    handleChange = (caller) => (event) => {
        switch(caller){
            case 0:
                this.setState({
                    usernameInput : event.target.value
                })
                break;
            case 1:
                this.setState({
                    passwordInput : event.target.value
                })
                break;            
        };
    }
    
    handleSubmit(event){
        event.preventDefault()  

        let receivedData = {}
        if (this.state.usernameInput.length == 0 || this.state.passwordInput.length == 0){
                alert('Forms cannot be empty');
                return;
        }
        let userInfo = {
            user_username: this.state.usernameInput,
            user_password : this.state.passwordInput
        }
        axios.post('/signin', userInfo).then((response) => {
            
            if (response.data != "User does not exist or User/Password combo incorrect"){
                receivedData = JSON.stringify(response.data);
                let updatePosition = {
                    user_latitude : this.state.updatedLatitude,
                    user_longitude : this.state.updatedLongitude,
                    user_username : this.state.usernameInput
                }
                axios.put('./updateposition', updatePosition).then((response) => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                });
            }
        }).catch((error) => {
            this.setState({
                backendResponse : "ya done fucked up"
            })
        });
        //routing to the /app main user page
        this.props.history.push({
            pathname : '/app',
            state: receivedData
        });
    }
    
    
    
    render() {
        return (
            <div className = "SignUpBox">
                <div>
                    <h3 style = {{textAlign: "center"}}>Welcome Back! Enter your Username and Password</h3>
                    <form style = {{textAlign: "center"}} onSubmit = {this.handleSubmit}>
                        <input placeholder = "username" onChange = {this.handleChange(0)} type = "text" value = {this.state.usernameInput}></input> <br></br>
                        <input placeholder = "password" onChange = {this.handleChange(1)} type = "text" value = {this.state.passwordInput}></input> <br></br>
                        <button type = "button" onClick = {this.getLocation}>Click to enable location services</button> <br></br>
                        <button type = "submit">Submit</button>
                    </form>

                    <h2>{this.state.backendResponse}</h2>
                </div>
            </div>
        );
    }
}

export default withRouter(ExistingSignin);