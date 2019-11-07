import * as firebase from 'firebase'

// Required for side-effects
require("firebase/firestore");
require("firebase/storage");
require("firebase/auth");

const config = {
  apiKey: "AIzaSyDS4HMTx8MAmmFbsbnvU3muvyjcrFFebAk",
  authDomain: "bioviz-webapp.firebaseapp.com",
  databaseURL: "https://bioviz-webapp.firebaseio.com",
  projectId: "bioviz-webapp",
  storageBucket: "bioviz-webapp.appspot.com",
  messagingSenderId: "377420984887",
  appId: "1:377420984887:web:37b52a53fccb69ae5785b2",
  measurementId: "G-T9XZ7VYC5S"
  };

firebase.initializeApp(config);

export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth =  firebase.auth();

//export default db;