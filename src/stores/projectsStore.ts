import { observable, autorun, toJS, configure, action, computed, extendObservable } from 'mobx';
import firebase from 'firebase';
import { History } from 'history';
import authStore from '../stores/authStore';
import { db, storage, auth } from '../firebaseConfig';
import { observer } from 'mobx-react';

class ProjectsStore {

    @observable username: any = "";
    @observable messages: any[] = [];
    @observable text: any = "";
    @observable profile_photo: any = "";

    constructor() {
        autorun(() => {
            var userId: any = authStore.user.uid;
            var database = db.ref('users/' + userId + '/username');
            database.once('value').then((snapshot: any) => {
                console.log('snapshote value', snapshot.val());
                this.username = snapshot.val();
            });
        });
    }

    @action createProject(projectName, username, email){
        db.ref('projects/' + authStore.user.uid).push({
            projectName: projectName,
            username: username,
            email: email,
          });
    }

}


const projectsStore = new ProjectsStore();

export default projectsStore;