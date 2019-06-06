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
    @observable audioFileURL: any = "";
    @observable audioFileUploaded: boolean = false;
    @observable projectName: any = "";
    @observable audioName: any = "";

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
            creationDate: this.getCurrentDate(),
            audio_file: this.audioFileURL
        });

        this.setAudioFileUploaded(false);

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

    getCurrentDate() {
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

    @action setAudioFileUploaded(value: boolean) {
        this.audioFileUploaded = value;
    }

    @action setAudioName(value: any) {
        this.audioName = value;
    }

    @action uploadAudioFile(fileContent: string) {

        let storage = firebase.storage().ref();
        let userEmail = authStore.currentEmail;
        let user = userEmail.split("@");
        //let audioFile = user[0] + '-' + this.projectName + ".mp3";
        let file = storage.child('audio_files/'  + user[0] + '/' + this.projectName + '/'+ this.audioName);
        file.putString(fileContent, 'data_url').then((snapshot: any) => {
            console.log('Uploaded a base64url string!');
            this.retrieveAudioFile();
        });
    }

    @action retrieveAudioFile() {

        var storage: any = firebase.storage().ref();

        let userEmail: any = authStore.currentEmail;
        //let img: any = userEmail.split("@");
        console.log('USER EMAIL:', userEmail);
        let user = userEmail.split("@");
        let audioFile = user[0] + '-' + this.projectName + ".mp3";
        console.log('audiofilename', audioFile);

        storage.child('audio_files/'  + user[0] + '/' + this.projectName + '/'+ this.audioName).getDownloadURL().then((url: any) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event: any) {
                var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();

            this.audioFileURL = url;
            this.setAudioFileUploaded(true);
            // Or inserted into an <img> element:
            console.log('foto: ', url);
            return url;
        }).catch(function (error) {
            // Handle any errors
        });

    }


}

const projectsStore = new ProjectsStore();

export default projectsStore;