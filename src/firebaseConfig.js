import * as firebase from 'firebase'

// Required for side-effects
require("firebase/firestore");
require("firebase/storage");
require("firebase/auth");

const config = {
    apiKey: "AIzaSyBAfPkOSKZSYdXA69R_752YKcUCSo39Fpk",
    authDomain: "bioviz-adv-web.firebaseapp.com",
    databaseURL: "https://bioviz-adv-web.firebaseio.com",
    projectId: "bioviz-adv-web",
    storageBucket: "bioviz-adv-web.appspot.com",
    messagingSenderId: "925443219612",
    appId: "1:925443219612:web:6beee62118e3c9af"
  };

firebase.initializeApp(config);

//export const db = firebase.firestore();
export var db = firebase.database();
export const storage = firebase.storage();
export const auth =  firebase.auth();

//export default db;