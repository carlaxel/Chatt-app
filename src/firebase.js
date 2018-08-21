import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDgyo5q_-F8y7iJO1PxbeaaIjc146ppUbc",
  authDomain: "react-firebase-chatt.firebaseapp.com",
  databaseURL: "https://react-firebase-chatt.firebaseio.com",
  projectId: "react-firebase-chatt",
  storageBucket: "react-firebase-chatt.appspot.com",
  messagingSenderId: "337485613965"
};
firebase.initializeApp(config);

export const chatt = firebase
  .database()
  .ref('/react-firebase-chatt');

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;
