import React, {Component}from 'react';
import Signup from './HomePageComp/Signup'
import ExistingSignin from './HomePageComp/ExistingSignin'

export default class HomePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      signInClicked : false,
      buttonState : 'Sign In'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  
  handleClick(event){
    let buttonString = ''
    if (this.state.signInClicked){
      buttonString = 'Sign In'
   }
   else{
     buttonString = 'Back'
   }
    this.setState(prevState => ({
      signInClicked: !prevState.signInClicked,
      buttonState : buttonString
    }))
  }


  render(){

    return (
      <div className="App">
        <header className="App-header">
          
          {this.state.signInClicked ? <ExistingSignin /> : <Signup />}
          
          <button onClick = {this.handleClick}>{this.state.buttonState}</button>
        </header>
      </div>
    );
  }
}
  

