import { observable, autorun, toJS, configure, action, computed } from 'mobx';

import firebase from 'firebase';

import { storage, auth } from '../firebaseConfig';

class Store {

  @observable credentials = {
    email: "",
    password: ""
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
  }


}

const store = new Store();

export default store;