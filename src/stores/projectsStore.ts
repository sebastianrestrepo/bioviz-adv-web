import { observable, autorun, action } from 'mobx';
import firebase from 'firebase';
import { db } from '../firebaseConfig';
import authStore from './authStore';

class ProjectsStore {

    @observable username: any = authStore.currentUsername;
    @observable projects: any[] = [];
    @observable text: any = "";
    @observable profile_photo: any = "";
    @observable audioFileURL: any = "";
    @observable audioFileUploaded: boolean = false;
    @observable projectName: any = "";
    @observable audioName: any = "";

    constructor() {

    }

    @action addProjectToDB(projectName: any, username: any, email: any) {
/*
        db.ref('projects/' + authStore.user.uid).push({
            projectName: projectName,
            username: username,
            email: email,
            creationDate: this.getCurrentDate(),
            audio_file: this.audioFileURL
        }); */

        this.setAudioFileUploaded(false);

    }

    /*
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
    } */

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
        console.log(authStore.currentEmail)
        let user = userEmail.split("@");
        //let audioFile = user[0] + '-' + this.projectName + ".mp3";
        let file = storage.child('audio_files/' + user[0] + '/' + this.projectName + '/' + this.audioName);
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

        storage.child('audio_files/' + user[0] + '/' + this.projectName + '/' + this.audioName).getDownloadURL().then((url: any) => {
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

    ///////////
    @observable showNewProjectForm: boolean = false;

    @action onCreateProject() {
        this.showNewProjectForm = true;
    }

    @action onCancelProjectCreation() {
        this.showNewProjectForm = false;
    }

    ///// PROJECT CREATION

    @observable creationStep = 1;
    @observable stepTitle = 'Detalles del Proyecto'
    @observable monacDistribution = [
        { value: '6', label: 'Hexágono' },
        { value: '4', label: 'Cruz' },
        { value: '5', label: 'Pentágono' }
    ]
    @observable monitoringSystems = [
        { value: 'arbimon', label: 'Arbimon' },
        { value: 'monac', label: 'MONAC' },
        { value: 'audiomoth', label: 'AudioMoth' }
    ]
    @action setStepTitle() {
        switch (this.creationStep) {
            case 0:
                this.showNewProjectForm = false;
                this.creationStep = 1;
                break;
            case 1:
                this.stepTitle = 'Detalles del Proyecto'
                break;
            case 2:
                this.stepTitle = 'Objetivo del proyecto'
                break;
            case 3:
                this.stepTitle = 'Datos recolectados'
                break;
            case 4:
                this.showNewProjectForm = false;
                this.creationStep = 1;
                break;
        }
    }
    @action onNextStepClick() {
        this.creationStep += 1;
        console.log(this.creationStep)
        this.setStepTitle()
    }

    @action onStepBackClick() {
        this.creationStep -= 1;
        this.setStepTitle()
    }
}

const projectsStore = new ProjectsStore();

export default projectsStore;