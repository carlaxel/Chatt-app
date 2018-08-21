import React, { Component } from "react";
import firebase, { chatt } from "../firebase";
import styled from 'styled-components';
import "../App.css";

class Loggedin extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.listenForFavorites();
  }

  listenForFavorites = () => {
    firebase
      .database()
      .ref("messages") // Listen for path /favorites only
      .on("child_added", snapshot => {
        let messages = [...this.state.messages];
        messages.push(snapshot.val());
        this.setState({messages});
        // Clone the original state
      }); // Each time child is added

    firebase
      .database()
      .ref("messages") // Listen for path /favorites only
      .on("child_removed", snapshot => {
        const favo = [...this.state.messages];
        const res = favo.filter((fav)=>{
          return fav.annonsid !== snapshot.val().annonsid;
        }) 
        this.setState({favorites:res})
         //Implement
      }); // Each time ANY value changes

    firebase
      .database()
      .ref("messages") // Listen for path /favorites only
      .on("child_changed", snapshot => {
        
      }); // Each time ANY value changes
  };

  onChange = e => {
    let update = e.target.value;
    this.setState({ textarea: update });
  };
  onSubmit = e => {
    e.preventDefault();
    if (!e.which || e.which == 13) {
      firebase
        .database()
        .ref(`/messages/`)
        .push({
          message: this.state.textarea,
          uid: this.props.user,
          userdisplay: this.props.userdisplay
        });
      this.setState({ textarea: "" });
    }
  };

  render() {

    const Div = styled.div`
background-color: white;
color:black;
margin: 10px;
padding: 25px;
border-radius:10px;
width: 500px;
height:180px;
display:flex;
flex-direction: column;
align-items: center;
`
const DivWrapper = styled.div`
display:flex;
flex-direction: column;
align-items: center;
`
      let messages = this.state.messages;
if(messages){
    messages = messages.map((mess)=>{
        return(
            <Div>
                <p>{mess.message}</p>
                <p style={{display:"inline", alignSelf:"flex-end",fontSize:"0.8em", marginTop:"auto"}}>{mess.userdisplay}</p>
            </Div>
        )
    })
}




    return (
        <React.Fragment>
      <div className="sendText">
        <form onSubmit={this.onSubmit}>
          <textarea
            value={this.state.textarea}
            onChange={this.onChange}
            onKeyUp={this.onSubmit}
          />
          <button>Send</button>
        </form>
      </div>
      <button onClick={this.props.func}>Log out</button>
      <DivWrapper>{messages}</DivWrapper>
      </React.Fragment>
    );
  }
}

export default Loggedin;
