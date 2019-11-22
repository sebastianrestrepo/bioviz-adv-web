import { observable, action } from 'mobx';
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

    @action onRetrieveProjects() {
        let that = this;
        db.collection("projects").onSnapshot((querySnapshot) => {
            this.projects = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().owner == authStore.currentUserInfo.id) {
                this.projects.push(doc.data())
                }
            });
        })
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
                this.uploadNewProject();
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

    @observable newProject = {
        id: "",
        date: "",
        name: "",
        description: "",
        owner: "",
        colleagues: "",
        location: "",
        species: [],
        intervalMode: false,
        continousMode: false,
        audioDuration: 5,
        frequency: 0,
        microhphone: '',
        monacDistribution: '',
        audioFiles: ''
    }


    @action uploadNewProject() {
        this.newProject.date = this.getCurrentDate();
        this.newProject.owner = authStore.currentUserInfo.id;
        let that = this;
        let tempId = '';
        db.collection("projects").add(this.newProject)
            .then(function (docRef) {
                tempId = docRef.id;
                db.collection("projects").doc(tempId).update({
                    "id": tempId
                })
                that.newProject = {
                    id: "",
                    date: "",
                    owner: "",
                    name: "",
                    description: "",
                    colleagues: "",
                    location: "",
                    species: [],
                    intervalMode: false,
                    continousMode: false,
                    audioDuration: 5,
                    frequency: 0,
                    microhphone: '',
                    monacDistribution: '',
                    audioFiles: ''
                }
                that.showNewProjectForm = false;
                that.creationStep = 1;
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        console.log('Subido')
    }

    @observable actualProject: any = {};

    @action retreiveOnlyProjectInfo(projectId: string) {
        let docRef = db.collection("projects").doc(projectId);
        let that = this;
        docRef.get().then(function (doc) {
            if (doc.exists) {
                that.actualProject = doc.data();
            } else {
                console.log("No such project!");
            }
        }).catch(function (error) {
            console.log("Error getting project:", error);
        });

    }

    //-------------Project Navigation
    @observable projectTabs: any = [
        {
            name: 'Vista General',
            selected: true,
            open: false
        }, {
            name: 'Etiquetado',
            selected: true,
            open: false
        }, {
            name: 'Listado',
            selected: true,
            open: false
        }, {
            name: 'Visualización',
            selected: true,
            open: false
        }, {
            name: 'Audios',
            selected: true,
            open: false
        }

    ]

    @action openProjectTab(section: number) {
        this.projectTabs[section].open = true;
        this.projectTabs.map((tab, index) => {
            (index == section) ? tab.selected = true : tab.selected = false;
        })
    }
    @action onClickProjectTab(section: number) {
        this.projectTabs.map((tab, index) => {
            (index == section) ? tab.selected = true : tab.selected = false;
        })
    }
    @action onCloseProjectTab(section: number) {
        this.projectTabs.map((tab, index) => {
            if (index == section) { tab.selected = false; tab.open = false; }
        })
    }
}

const projectsStore = new ProjectsStore();

export default projectsStore;