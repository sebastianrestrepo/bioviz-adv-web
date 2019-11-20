import { observable, action } from "mobx";

class TaggingStore {

    //------------------------------------ Color edition -------------------//
    @observable colorEditionStatus: boolean = false;
    @observable contrastEditionStatus: boolean = false;

    @action onColorEdit() {
        this.colorEditionStatus = true;
        this.contrastEditionStatus = false;
    }

    @observable scaleNameSelected = 'gray';

    @observable scale1Selected = true;
    @observable scale2Selected = false;
    @observable scale3Selected = false;
    @observable scale4Selected = false;
    @observable scale5Selected = false;
    @observable scale6Selected = false;
    @observable scale7Selected = false;

    @action onScaleSelection(scale: string) {
        switch (scale) {
            case 'gray':
                this.scale1Selected = true;
                this.scale2Selected = false;
                this.scale3Selected = false;
                this.scale4Selected = false;
                this.scale5Selected = false;
                this.scale6Selected = false;
                this.scale7Selected = false;
                break;
            case '2':
                this.scale1Selected = false;
                this.scale2Selected = true;
                this.scale3Selected = false;
                this.scale4Selected = false;
                this.scale5Selected = false;
                this.scale6Selected = false;
                this.scale7Selected = false;
                break;
            case '3':
                this.scale1Selected = false;
                this.scale2Selected = false;
                this.scale3Selected = true;
                this.scale4Selected = false;
                this.scale5Selected = false;
                this.scale6Selected = false;
                this.scale7Selected = false;
                break;
            case '4':
                this.scale1Selected = false;
                this.scale2Selected = false;
                this.scale3Selected = false;
                this.scale4Selected = true;
                this.scale5Selected = false;
                this.scale6Selected = false;
                this.scale7Selected = false;
                break;
            case '5':
                this.scale1Selected = false;
                this.scale2Selected = false;
                this.scale3Selected = false;
                this.scale4Selected = false;
                this.scale5Selected = true;
                this.scale6Selected = false;
                this.scale7Selected = false;
                break;
            case '6':
                this.scale1Selected = false;
                this.scale2Selected = false;
                this.scale3Selected = false;
                this.scale4Selected = false;
                this.scale5Selected = false;
                this.scale6Selected = true;
                this.scale7Selected = false;
                break;
            case '7':
                this.scale1Selected = false;
                this.scale2Selected = false;
                this.scale3Selected = false;
                this.scale4Selected = false;
                this.scale5Selected = false;
                this.scale6Selected = false;
                this.scale7Selected = true;
                break;
        }
    }

    //------------------------------------ Bright & Contrast edition -------------------//

    @action onContrastEdit() {
        this.contrastEditionStatus = true;
        this.colorEditionStatus = false;
    }

    @observable brightVal = 1;
    @observable contrastVal = 1;

    //--------------------------------SAVE DATA LABELED --------------------------------//

    
    @observable playingSuggestion = false;
    @observable selected1 = false;
    @observable selected2 = false;
    @observable selected3 = false;
    @observable selected4 = false;
    @observable selected5 = false;
    @observable selected6 = false;
    @observable isSomethingSelected = false;

    @observable isPlaying = false;
    @observable verified = false;

    @action updateMark() {
        this.verified = true;
    }

    @action playBirdSong(url) {
        let a = new Audio(url);
        let setPlay = true;
        if (!this.isPlaying) {
            this.isPlaying = true;
            a.play()
            let that = this;
            setTimeout(function () {
                that.isPlaying = false;
                a.pause();

            },
                4500)
        }

    }

    //Without AI

    @observable isNoteActivated = false;
    @observable commonName;
    @observable sciName;
    
    @action onNoteClick() {
        this.isNoteActivated = true;
    }

    
    @action birdClick(value: number) {
        switch (value) {
            case 1:
                this.commonName = 'Barranquero bocon'
                this.sciName = 'Electron platyrhynchum'
                break;
            case 2:
                this.commonName = 'Piranga Roja'
                this.sciName = 'Piranga rubra'
                break;
            case 3:
                this.commonName = 'Mosquero moñudo'
                this.sciName = 'Mitrephanes phaeocercus'
                break;
            case 4:
                this.commonName = 'Torito cabeciblanco'
                this.sciName = 'Capito maculicoronatus'
                break;
        }

    }


    

    //with AI
    @observable mainSpecSuggested = false;
    @observable isSomethingZoomed = false;
    @observable zoomedSpeImgUrl = ""
    @observable zoomedSpeAudioUrl = ""

    @action onSpecZoomView(img, audio) {
        this.isSomethingZoomed = true;
        this.zoomedSpeAudioUrl = audio;
        this.zoomedSpeImgUrl = img;
    }

    @action onExitZoomView() {
        this.isSomethingZoomed = false;
        this.zoomedSpeAudioUrl = '';
        this.zoomedSpeImgUrl = '';
    }

    @observable isUnfoldedReference = false;
    @action onDisplayOtherSings() {
        this.isUnfoldedReference = !this.isUnfoldedReference;
    }
}
const tagStore = new TaggingStore();

export default tagStore;