import React, { Component } from "react";
import firebase, { googleProvider } from '../firebase';



class LogIn extends Component{

    componentDidMount() {

        this.auth();
      }
       
      auth = () => {
        firebase.auth().onAuthStateChanged((user) => {
          if(user){
              console.log(user);
            this.props.func(user);
          } else {
            this.props.func();
          }
        })
        
      }  
      
      login = () => {
        firebase
          .auth()
          .signInWithPopup(googleProvider)
      }

      
    render(){
        return(
            <button onClick={this.login}>
            Google Login
          </button>
        )
    }
}

export default LogIn;
