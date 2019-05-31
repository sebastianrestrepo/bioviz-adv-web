import { observable, autorun, toJS, configure, action, computed, extendObservable } from 'mobx';
import firebase from 'firebase';
import { History } from 'history';
import { db, storage, auth } from '../firebaseConfig';

class ChatStore {

    @observable messages: any[] = [];
    @observable text: any = "";

    constructor() {
        this.getMessages();
    }

    @action writeMessageToDB = message => {
        db
            .ref("messages/")
            .push({
                text: message
            })
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