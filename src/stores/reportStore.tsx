import birdsDataJSON from './../bird_classification.json';
import { observable, action } from "mobx";
import { db } from "../firebaseConfig";
import projectsStore from './projectsStore';

class ReportStore {

    @observable birdsData: any = [];
    @observable speciesList: any = []
    @observable newSpecieLabeled: any = {
        sciName: '',
        commonName: '',
        order: '',
        family: '',
        gender: '',
        audioUrl: '',
        startTime: 0,
        endTime: 0
    }

    constructor() {
        this.birdsData = birdsDataJSON;
        console.log(this.birdsData)
        this.onOptionsListBuild()
    }

    
    //---------------------- TAGGING SECTION LISTS REQUIRED -------------------------//
    @observable scinamesOptions: any = []

    onOptionsListBuild() {
        let tempScinameOption = {
            value: '',
            label: ''
        }
        this.birdsData.map((e, i) => {
            tempScinameOption.value = e.SCI_NAME;
            tempScinameOption.label = e.SCI_NAME;
            this.scinamesOptions.push(tempScinameOption)
        })
    }
    //-----------------------------LISTADO----------------------------------------
    @action onRetrieveSpeciesList() {
        let that = this;
        db.collection("projects").doc(projectsStore.actualProject.id).collection("speciesList").onSnapshot((querySnapshot) => {
            this.speciesList = [];
            querySnapshot.forEach((doc) => {
                this.speciesList.push(doc.data())
            });
        })
    }

    @action onSaveDataLabeled(sciname, commonName) {

        this.newSpecieLabeled.sciName = sciname;
        this.newSpecieLabeled.commonName = commonName;

        this.birdsData.map((e) => {
            if (e.SCI_NAME === sciname) {
                this.newSpecieLabeled.order = e.ORDER1;
                this.newSpecieLabeled.family = e.FAMILY;
            }
        })
        let that = this;
        db.collection("projects").doc(projectsStore.actualProject.id).collection("speciesList").add(this.newSpecieLabeled)
            .then(function (docRef) {
                that.newSpecieLabeled = {
                    sciName: '',
                    commonName: '',
                    order: '',
                    family: '',
                    gender: '',
                    audioUrl: '',
                }
                that.onRetrieveSpeciesList();
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }

    @observable listFileName: string = ''
    @observable fileUri: any;
    @observable convertionDone: boolean = false;
    @action onDownloadList() {
        let datajson = JSON.stringify(this.speciesList)
        console.log('JSON', datajson)

        let listData = typeof datajson != 'object' ? JSON.parse(datajson) : datajson;
        let CSV = '';

        let row = '';
        for (var index in listData[0]) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';

        //1st loop is to extract each row
        for (let i = 0; i < listData.length; i++) {
            let _row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (let index in listData[i]) {
                _row += '"' + listData[i][index] + '",';
            }

            _row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += _row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        this.listFileName = "listado"

        this.fileUri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        this.convertionDone = true;
    }

}
const reportStore = new ReportStore();

export default reportStore;