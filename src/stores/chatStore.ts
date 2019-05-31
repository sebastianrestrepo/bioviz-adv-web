import { observable, autorun, toJS, configure, action, computed, extendObservable } from 'mobx';
import firebase from 'firebase';
import { History } from 'history';
import authStore from '../stores/authStore';
import { db, storage, auth } from '../firebaseConfig';
import { observer } from 'mobx-react';

class ChatStore {

    @observable username: any = "";
    @observable messages: any[] = [];
    @observable text: any = "";

    constructor() {
        this.getMessages();
    }

    getUserName() {
        var userId: any = authStore.user.uid;
       /* var starCountRef = firebase.database().ref('users/' + userId + '/username');
        starCountRef.on('value', (snapshot: any) => {
            this.username = snapshot.val();
        });*/
        return firebase.database().ref('/users/' + userId).once('value').then((snapshot: any) => {
            this.username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            // ...
        });
    }

    @action writeMessageToDB = message => {
        this.getUserName();
        db.ref("messages/")
            .push({
                userName: this.getUserName(),
                id: authStore.user.uid,
                text: message
            })
        console.log('ESTE ES EL NOMBRE DE USUARIO', this.username);
    }

    @action getMessages = () => {
        var messagesDB =
            db.ref("messages/")
                .limitToLast(500);
        messagesDB.on("value", snapshot => {
            let newMessages: any[] = [];
            snapshot.forEach(child => {
                var message = child.val();
                newMessages.push({
                    userName: this.username,
                    id: child.key,
                    text: message.text,
                });
                this.messages = newMessages;
                console.log(this.messages);
            });
        });

    }
}


const chatStore = new ChatStore();

export default chatStore;