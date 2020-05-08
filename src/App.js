import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import HomePage from './HomePage.js';
import UserPage from './UserPage.js';

export default class App extends Component{
    render(){
        return(
            <BrowserRouter>
            <div>
                <Route path = "/" component = {HomePage} exact/>
                <Route path = "/app" component = {UserPage}/>
            </div>
            </BrowserRouter>
        )
    }

}