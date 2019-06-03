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
  @observable profilePhoto: any = "";

  @observable currentEmail: any = "";
  @observable currentUsername: any = "";
  @observable profilePhotoURL: any = "";

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
          this.getUserName();
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
    autorun(() => {
      var userId: any = authStore.user.uid;
      var database = db.ref('users/' + userId + '/username');
      database.once('value').then((snapshot: any) => {
          console.log('snapshote value', snapshot.val());
          this.currentUsername = snapshot.val();
      });
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

 readEmail() {
    autorun(() => {
      var database = db.ref('users/' + this.user.uid + '/email');
      database.once('value').then((snapshot: any) => {
        console.log('snapshote value', snapshot.val());
        this.currentEmail = snapshot.val();
        this.retrieveProfilePhoto(this.currentEmail);
      });
    });
  }

  @action retrieveProfilePhoto(email: any) {

    var storage: any = firebase.storage().ref();
    
    let userEmail: any = this.currentEmail;
    //let img: any = userEmail.split("@");
    console.log('Jose es marica', userEmail);
    let img = userEmail.split("@");
    let userProfilePicture = img[0] + ".jpg";
    console.log('Jose es puto', userProfilePicture);
    console.log('EQUIS DEE', storage.child('profile_photos/' + 'sebrestrepo.jpg'));

    storage.child('profile_photos/' + userProfilePicture).getDownloadURL().then((url: any) => {
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function (event: any) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      this.profilePhotoURL = url;
      // Or inserted into an <img> element:
      console.log('foto: ', url);
      return url;
    }).catch(function (error) {
      // Handle any errors
    });

  }

}

const authStore = new AuthStore();

export default authStore;