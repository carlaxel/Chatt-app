import React, { Component } from 'react';
import firebase, { googleProvider } from './firebase';
import Loggedin from './components/loggedin';
import LogIn from './components/LogIn';
import './App.css';

class App extends Component {

state = {
user : ""
}

componentDidMount(){
 
}

login = (user) => {
  if(user){
    this.setState({user: user.uid, userdisplay: user.displayName})
  }
  
}
logout= () => {
  
    this.setState({user:""})
    firebase.auth().signOut();
  
}


  render() {
    return (
      
        
        <div className="App">
          <header className="App-header">

          {this.state.user ? (
          < Loggedin user={this.state.user} userdisplay={this.state.userdisplay} func={this.logout}/>
        )
        :
        (
        <LogIn func={this.login}/>
      )}
          </header>
          
        </div>
      
      
    );
}
}

export default App;
