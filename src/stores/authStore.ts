import { observable, autorun, toJS, configure, action, computed, extendObservable } from 'mobx';
import firebase from 'firebase';
import { History } from 'history';
import { db, storage, auth } from '../firebaseConfig';

class AuthStore {

  @observable user: any = null;
  @observable error: any = null;
  @observable isError: boolean = false;
  @observable isNewUSer: boolean = false;
  @observable isLogged: boolean = false;
  @observable registerDone: boolean = false;

  constructor() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.isLogged = true;
      } else {
        // No user is signed in.
        this.isLogged = false;
      }
    });

  }

  @observable credentials = {
    name: "",
    email: "",
    password: "",
    isOnline: ""
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

    this.writeUserData(123, name, email, "false");

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

  @action signOut() {
    auth.signOut();
    console.log(firebase.auth().currentUser, 'cerró sesión');
    this.isLogged = false;
    console.log('estado', this.isLogged);
  }

  @action writeUserData(userId, name, email, isOnline) {
    db.ref('users/' + userId).set({
      username: name,
      email: email,
      isOnline: isOnline,
    });
  }

  @action updateUserStatus() {
    /*db.ref('users/' + userId).child(isOnline).set("true")
      .then().catch();*/
      this.isLogged = true;
      console.log('ESTADO LOG', this.isLogged);
  }

  @action uploadProfilePhoto(fileName: string, fileContent: string) {
    let storage = firebase.storage().ref();
    let file = storage.child('profile_photos/' + fileName);
    file.putString(fileContent, 'data_url').then(function (snapshot) {
      console.log('Uploaded a base64url string!');
    });
    localStorage.setItem('logState', JSON.stringify(true));
    authStore.isLogged = Boolean(localStorage.getItem('logState'));
  }

}

const authStore = new AuthStore();

export default authStore;