import React, { Component } from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import '/Users/hongchen/WeebTinder/client/src/App.css'



class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            usernameInput: '',
            passwordInput: '',
            emailInput: '',
            firstnameInput: '',
            lastnameInput: '',
            latitudeInput: '',
            longitudeInput: '',
            sexInput: '',
            backendResponse: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);
        this.getLocation = this.getLocation.bind(this);
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
            case 2:
                this.setState({
                    emailInput : event.target.value
                })
                break;
            case 3:
                this.setState({
                    firstnameInput : event.target.value
                })
                break;     
            case 4:
                this.setState({
                    lastnameInput : event.target.value
                })
                break;  
            case 5:
                this.setState({
                    sexInput: event.target.value.toUpperCase()
                })            
        };
    }

    getLocation(){
            
        navigator.geolocation.getCurrentPosition(this.getCoordinates);
              
    }

    getCoordinates(position){
        console.log(position.coords.latitude);
        this.setState({
            latitudeInput : position.coords.latitude,
            longitudeInput : position.coords.longitude
        })
        console.log(this.state.latitudeInput)
        console.log(this.state.longitudeInput)
    }

    handleSubmit(event){
        event.preventDefault() 
        if (this.state.usernameInput.length == 0 || this.state.passwordInput.length == 0 || 
            this.state.emailInput.length == 0 || this.state.firstnameInput.length == 0 || this.state.lastnameInput.length == 0 || this.state.sexInput.length == 0){
                alert('Forms cannot be empty');
                return;
        }
        else{
            console.log(this.state.latitudeInput);
            console.log(this.state.longitudeInput)
            let userInfo = {
                user_username: this.state.usernameInput,
                user_password : this.state.passwordInput,
                user_email : this.state.emailInput,
                user_firstname : this.state.firstnameInput,
                user_lastname : this.state.lastnameInput,
                user_latitude : this.state.latitudeInput,
                user_longitude : this.state.longitudeInput,
                user_sex : this.state.sexInput
            };
            //post request to add the user to the main authentication table
            axios.post('/createuser', userInfo).then((response) => {
                console.log(response)
                this.setState({
                   backendResponse: "User added to the database!"
                })
            }).catch((error) => {
                this.setState({
                    backendResponse : "ya done fucked up"
                })
            });
            //post request to create the user's own table
            axios.post('/createusertable', {user_username : this.state.usernameInput}).then(response => {
                console.log(response)
            }).catch((err) => {
                console.log(err)
            })
        }
        //routing to the /app main user page
        this.props.history.push({
            pathname : '/app',
            state: {
                user_username: this.state.usernameInput,
                user_password : this.state.passwordInput,
                user_email : this.state.emailInput,
                user_firstname : this.state.firstnameInput,
                user_lastname : this.state.lastnameInput,
                user_latitude : this.state.latitudeInput,
                user_longitude : this.state.longitudeInput,
                user_sex : this.state.sexInput
            }
        });
    }
    
    render() {
        return (
            <div className = "SignUpBox">
                <div>
                    <h3 style = {{textAlign : "center"}}>Welcome! Fill in the blanks below</h3> 
                    <br></br>
                        <form style = {{textAlign : "center"}}onSubmit = {this.handleSubmit}>
                            <input placeholder = "username" onChange = {this.handleChange(0)} type = "text" value = {this.state.usernameInput}></input>
                            <br></br>
                            <input placeholder = "password" onChange = {this.handleChange(1)} type = "text" value = {this.state.passwordInput}></input>
                            <br></br>
                            <input placeholder = "abc123@hotmail.com" onChange = {this.handleChange(2)} type = "text" value = {this.state.emailInput}></input>
                            <br></br>
                            <input placeholder = "John" onChange = {this.handleChange(3)} type = "text" value = {this.state.firstnameInput}></input>
                            <br></br>
                            <input placeholder = "Smith" onChange = {this.handleChange(4)} type = "text" value = {this.state.lastnameInput}></input>
                            <br></br>
                            <input placeholder = "Sex: M or F" onChange = {this.handleChange(5)} type = "text" value = {this.state.sexInput}></input>
                            <br></br>
                            <br></br>
                            <button type = "button" onClick = {this.getLocation}>Click to enable location services</button>
                            <br></br> 
                            <br></br>
                            <button type = "submit">Submit</button>
                        </form> 
                        
                    <h1>{this.state.backendResponse}</h1>
                </div>
            </div>
        );
    }
}

export default withRouter(Signup);