import { observable, autorun, toJS, configure, action, computed } from 'mobx';

import firebase from 'firebase';

import { History } from 'history';

import { storage, auth } from '../firebaseConfig';

class Store {

  constructor() {
    auth.onAuthStateChanged((receivedUser) => {
      if (receivedUser) {
        this.user = receivedUser;
        this.isLogged = true;
        if (this.isNewUSer) {
          this.addNewUser(this.user)
          this.isNewUSer = false;
        }
      } else {
        this.user = null;
        this.isLogged = false;
      }
    });
  }

  @observable credentials = {
    email: "",
    password: ""
  }

  @observable newUser = {
    email: "",
    uid: "",
  }

  @observable user: any = null;
  @observable error: any = null;
  @observable isError: boolean = false;
  @observable isNewUSer: boolean = false;
  @observable isLogged: boolean = false;

  @action register(email: string, password: string) {
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
    this.isLogged = true;
    console.log(firebase.auth().currentUser, 'se registró');
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
    //history.go(1);
    console.log(firebase.auth().currentUser, 'inició sesión');
  }

  @action signOut() {
    auth.signOut();
    console.log(firebase.auth().currentUser, 'cerró sesión');
    this.isLogged = false;
  }

  @action setIsLogged(value: any) {
    this.isLogged = value;
    console.log(this.isLogged);
  }

  @action addNewUser(user: any) {
    if (user != null) {
      this.newUser.email = user.email;
      this.newUser.uid = user.uid;
      let img = user.email.split("@");
      console.log("agregando usuario:")
      //db.collection("Users").add(this.newUser);
      console.log(this.newUser.email)
    }
  }

}

const store = new Store();

export default store;