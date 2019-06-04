import { observable, autorun, toJS, configure, action, computed, extendObservable } from 'mobx';
import firebase from 'firebase';
import { History } from 'history';
import authStore from '../stores/authStore';
import { db, storage, auth } from '../firebaseConfig';
import { observer } from 'mobx-react';

class ProjectsStore {

    @observable username: any = "";
    @observable projects: any[] = [];
    @observable text: any = "";
    @observable profile_photo: any = "";

    constructor() {
        autorun(() => {
            var userId: any = authStore.user.uid;
            this.getProjects(userId);
            var database = db.ref('users/' + userId + '/username');
            database.once('value').then((snapshot: any) => {
                console.log('snapshote value', snapshot.val());
                this.username = snapshot.val();
            });
        });
    }

    @action addProjectToDB(projectName: any, username: any, email: any) {
        db.ref('projects/' + authStore.user.uid).push({
            projectName: projectName,
            username: username,
            email: email,
            creationDate: this.getCurrentDate()
        });
    }

    getProjects = (userId: any) => {
        var projectsDB =
            db.ref('projects/' + userId)
                .limitToLast(500);
        projectsDB.on("value", snapshot => {
            let newProjects: any[] = [];
            snapshot.forEach(child => {
                var project = child.val();
                newProjects.push({
                    projectName: project.projectName,
                    username: project.username,
                    email: project.email,
                    creationDate: project.creationDate
                });
                this.projects = newProjects;
                console.log(this.projects);
            });
        });
    }

    getCurrentDate(){
        var today: any = new Date();
        var dd: any = today.getDate();
        var mm: any = today.getMonth() + 1; //January is 0!
        var yyyy: any = today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes();

        if (dd < 10) {
            dd = '0' + dd
        }
    
        if (mm < 10) {
            mm = '0' + mm
        }
    
        today = mm + '/' + dd + '/' + yyyy + ' ' + time;
        return today;
    }

}

const projectsStore = new ProjectsStore();

export default projectsStore;