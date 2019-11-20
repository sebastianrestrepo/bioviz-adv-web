import { observable, action} from 'mobx';
import firebase from 'firebase';
import { db, auth } from '../firebaseConfig';



class AuthStore {


  @observable user: any = null;
  @observable error: any = null;
  @observable isError: boolean = false;
  @observable isNewUSer: boolean = false;
  @observable isLogged: boolean = false;
  @observable statusChecked: boolean = false;
  @observable profilePhoto: any = "";

  @observable currentEmail: any = "";
  @observable currentUsername: any = "";
  @observable profilePhotoURL: any = "";

  constructor() {
    // this.checkUserStatus();
    this.authChange();
  }

  @action authChange() {
    auth.onAuthStateChanged((retrievedUser) => {
      if (retrievedUser != null) {
        // User is signed in.
        this.user = retrievedUser;
        this.isLogged = true;
        this.statusChecked = true;
        this.getUserData(this.user.uid);
        console.log("hello", this.isNewUSer)
        if (this.isNewUSer) {
          this.addNewUser(this.user)
          this.isNewUSer = false;
        }

      } else {
        this.isLogged = false;
        this.statusChecked = true;
      }
    })
  }

  @observable credentials = {
    name: "",
    email: "",
    password: ""
  }
  @observable newUser = {
    name: "",
    email: "",
    id: ""
  }
  @observable currentUserInfo = {
    name: "",
    email: "",
    id: ""
  }



  @action register(name: string, email: string, password: string) {
    this.credentials.name = name;
    this.credentials.email = email;
    this.credentials.password = password;

    let that = this;
    auth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this.isNewUSer = true;
      }
    ).catch(error => {
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

  }

  addNewUser(user) {
    this.newUser.name = this.credentials.name;
    this.newUser.email = user.email;
    this.newUser.id = user.uid;

    let that = this;
    db.collection("users").add(this.newUser)
      .then(function (docRef) {
        that.isNewUSer = false;
        that.credentials = {
          name: "",
          email: "",
          password: ""
        }
        that.newUser = {
          name: "",
          email: "",
          id: ""
        }
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    console.log('Subido')

  }

  @action getUserData(userIDRetrieved: string) {
    console.log('obteniendo info.....')
    let that = this;
    db.collection("users").where("id", "==", userIDRetrieved)
      .get().then( function(querySnapshot) {
        querySnapshot.forEach((doc) => {
          console.log('encontró el doc.....')

          that.currentUserInfo = {
            name: doc.data().name,
            email: doc.data().email,
            id: doc.data().id

          }
          console.log('el doc es .....', doc.data())

          console.log(that.currentUserInfo.name)
        });
      });
  }

  @action setStatusChecked(value: boolean) {
    this.statusChecked = value;
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

  }

  @action signOut() {
    console.log(firebase.auth().currentUser, 'va cerrar sesión');
    auth.signOut();
    this.user = null;
    console.log(firebase.auth().currentUser, 'cerró sesión');
    this.isLogged = false;
    this.currentUserInfo = {
      name: '',
      email: '',
      id: ''

    }
  }

  @action updateUserStatus() {
    this.isLogged = true;
  }

  @action setProfilePhoto(value: any) {
    this.profilePhoto = value;
  }

  @action uploadProfilePhoto(fileContent: string) {
    /*  let storage = firebase.storage().ref();
      let userEmail = this.credentials.email;
      if (userEmail != null) {
        let img = userEmail.split("@");
        let userProfilePicture = img[0] + ".jpg";
        let file = storage.child('profile_photos/' + userProfilePicture);
        file.putString(fileContent, 'data_url').then(function (snapshot) {
          console.log('Uploaded a base64url string!');
        });
      }
  */
  }

  @action retrieveProfilePhoto(email: any) {

    var storage: any = firebase.storage().ref();

    let userEmail: any = this.currentEmail;
    //let img: any = userEmail.split("@");
    if (userEmail != null) {
      let img = userEmail.split("@");
      let userProfilePicture = img[0] + ".jpg";
      console.log('foto perfil', userProfilePicture);
      console.log('foto url', storage.child('profile_photos/' + 'sebrestrepo.jpg'));

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

}

const authStore = new AuthStore();

export default authStore;