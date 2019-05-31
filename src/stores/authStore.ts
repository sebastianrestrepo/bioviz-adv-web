import { observable, autorun, toJS, configure, action, computed, extendObservable } from 'mobx';
import firebase from 'firebase';
import { History } from 'history';
import { db, storage, auth } from '../firebaseConfig';
import { userInfo } from 'os';
import React, { Component } from 'react';


class AuthStore {

  @observable user: any = null;
  @observable error: any = null;
  @observable isError: boolean = false;
  @observable isNewUSer: boolean = false;
  @observable isLogged: boolean = false;
  @observable registerDone: boolean = false;
  @observable statusChecked: boolean = false;


  constructor() {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is signed in.
        this.user = userAuth;
        this.isLogged = true;
        console.log('User is signed in.', userAuth);
        console.log('this.user', this.user);

      } else {
        // No user is signed in.
        console.log('NO user is signed in.');
        this.isLogged = false;
      }
    })
  }



  @observable credentials = {
    name: "",
    email: "",
    password: "",
    id: "",
    isOnline: ""
  }


  @action checkUserStatus() {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // User is signed in.
        this.user = userAuth;
        this.isLogged = true;
        console.log('User is signed in.', userAuth);
        console.log('this.user', this.user);
        this.statusChecked = true;
      } else {
        // No user is signed in.
        console.log('NO user is signed in.');
        this.isLogged = false;
        this.statusChecked = true;
      }
    })
  }

@action getUserName() {
    var userId = authStore.user.uid;
    return db.ref('/users/' + userId).once('value').then(function (snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      // ...
    });
  }

  @action setStatusChecked(value: boolean) {
    this.statusChecked = value;
  }

  @action register(name: string, email: string, password: string) {
    this.credentials.name = name;
    this.credentials.email = email;
    this.credentials.password = password;

    auth.createUserWithEmailAndPassword(email, password).catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;

      this.isError = true;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
    })
    this.isError = false;
    this.isNewUSer = true;

    this.writeUserData(name, email, "false");

    this.registerDone = true;
    /*console.log(firebase.auth().currentUser, 'se registró');
    console.log('estado', this.isLogged);*/
  }


  @action login(email: string, password: string) {
    let logged = false;
    auth.signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        logged = false;
        alert(errorMessage);
      });
    window.history.go(1);

    this.isLogged = true;
    console.log(firebase.auth().currentUser, 'inició sesión');
    console.log('estado', this.isLogged);
  }

  @action userState() {
    return this.user;
  }

  @action signOut() {
    auth.signOut();
    this.user = null;
    console.log(firebase.auth().currentUser, 'cerró sesión');
    this.isLogged = false;
  }

  @action writeUserData(name, email, isOnline) {
    if (this.user != null) {

      db.ref('users/' + this.user.uid).set({
        username: name,
        email: email,
        isOnline: isOnline,
      });
    }
  }

  @action updateUserStatus() {
    /*db.ref('users/' + userId).child(isOnline).set("true")
      .then().catch();*/
    this.isLogged = true;
    console.log('ESTADO LOG', this.isLogged);
  }

  @action uploadProfilePhoto(fileContent: string) {
    let storage = firebase.storage().ref();
    let userEmail = this.credentials.email;
    let img = userEmail.split("@");
    let userProfilePicture = img[0] + ".jpg";
    let file = storage.child('profile_photos/' + userProfilePicture);
    file.putString(fileContent, 'data_url').then(function (snapshot) {
      console.log('Uploaded a base64url string!');
    });
    localStorage.setItem('logState', JSON.stringify(true));
    authStore.isLogged = Boolean(localStorage.getItem('logState'));
  }

}

const authStore = new AuthStore();

export default authStore;