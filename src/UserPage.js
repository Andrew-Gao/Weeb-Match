import React, {Component}from 'react';

export default class Homepage extends Component{
    constructor(props){
        super(props);

        this.state = {

        }
    }
    
    
    render(){
        console.log(this.props.location.state)
        return(
            <div>
                <h1>{`Hello, ${this.props.location.state.user_firstname}`}</h1>
            </div>
        )
    }
}