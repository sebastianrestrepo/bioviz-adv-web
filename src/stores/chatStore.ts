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
    @observable profile_photo: any = "";


    constructor() {
        this.getMessages();
        autorun(() => {
            var userId: any = authStore.user.uid;
            var database = db.ref('users/' + userId + '/username');
            database.once('value').then((snapshot: any) => {
                console.log('snapshote value', snapshot.val());
                this.username = snapshot.val();
            });
        });
    }

    @action sendMessage(message) {
        var userId: any = authStore.user.uid;
        autorun(() => {
            var database = db.ref('users/' + userId + '/username');
            database.once('value').then((snapshot: any) => {
                console.log('snapshote value', snapshot.val());
                this.username = snapshot.val();
                this.writeMessageToDB(message);
            });
        });
    }

    @action writeMessageToDB = message => {
        //this.getUserName();
        db.ref("messages/")
            .push({
                username: this.username,
                id: authStore.user.uid,
                text: message,
                profile_photo: authStore.profilePhotoURL
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
                    username: message.username,
                    id: child.key,
                    text: message.text,
                    profile_photo: message.profile_photo
                });
                this.messages = newMessages;
                console.log(this.messages);
            });
        });

    }
}


const chatStore = new ChatStore();

export default chatStore;