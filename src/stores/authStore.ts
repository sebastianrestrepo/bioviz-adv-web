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
  @observable profilePhoto: any = false;


  constructor() {
    this.checkUserStatus();
  }


  @observable credentials = {
    name: "",
    email: "",
    password: "",
    id: "",
    isOnline: ""
  }

  @action checkUserStatus() {
    autorun(() => {
      console.log('autorun in checkUserStatus() working');
      auth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          // User is signed in.
          this.user = userAuth;
          this.isLogged = true;
          console.log('User is signed in.', userAuth);
          console.log('isLogged state: ', this.isLogged);
          this.statusChecked = true;
        } else {
          // No user is signed in.
          console.log('NO user is signed in.');
          console.log('isLogged state: ', this.isLogged);
          this.isLogged = false;
          this.statusChecked = true;
        }
      })
    });
  }

  @action getUserName() {
    var userId = authStore.user.uid;
    return db.ref('/users/' + userId).once('value').then(function (snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
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
    autorun(() => {
      if (this.user != null) {
        this.uploadProfilePhoto(this.profilePhoto);
        this.writeUserData(name, email, this.profilePhoto);
      }
    });
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
  }

  @action signOut() {
    auth.signOut();
    this.user = null;
    console.log(firebase.auth().currentUser, 'cerró sesión');
    this.isLogged = false;
    this.registerDone = false;
  }

  @action writeUserData(name, email, profile_picture) {
    if (this.user != null) {
      console.log('writing user info')
      db.ref('users/' + this.user.uid).set({
        username: name,
        email: email,
        profile_picture: profile_picture
      });
    }
  }

  @action updateUserStatus() {
    this.isLogged = true;
  }

  @action setProfilePhoto(value: any) {
    this.profilePhoto = value;
  }

  @action setRegisterStatus(value: boolean) {
    console.log('value changed');
    this.registerDone = value;
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
  }

}

const authStore = new AuthStore();

export default authStore;