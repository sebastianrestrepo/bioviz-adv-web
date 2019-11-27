import { observable, action } from "mobx";
import reportStore from "./reportStore";

class TaggingStore {

    //------------------------------- MANAGE ATOMS-------------------------------//
    @observable isDateTimeSelected = false;
    @observable isGenSpectroSelected = false;
    @observable isSelSpectroSelected = false;
    @observable isDataLabeling = false;
    @observable isComparingMicros = false;
    @observable isGeneralSpectro = false;

    @action onDateSelected() {
        this.isDateTimeSelected = true;
    }

    @action onCompareClick() {
        this.isComparingMicros = true;

    }

    @action onTagAudio() {
        this.isDataLabeling = true;

    }

    //---------------------------------DATE selection -----------------------------//

    @observable dayAnalyzing: any = ''
    @observable timeAnalyzing: any = ''
    @observable focusedDayInput: boolean = false;
    @observable actualTime: any = '00:01'
    @observable isAiOn: boolean = false;
    @observable isColorEditorOn: boolean = false;
    @observable isContrastEditorOn: boolean = false;
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

    //--------------------------------COMPARING AUDIO DATA -------------------------------//

    //COMPARE SECTION
    @observable comparedMicro1Activated = true;
    @observable comparedMicro2Activated = false;
    @observable comparedMicro3Activated = false;
    @observable comparedMicro4Activated = false;
    @observable comparedMicro5Activated = false;
    @observable comparedMicro6Activated = false;

    @observable isPrincipal1 = true;
    @observable isPrincipal2 = false;
    @observable isPrincipal3 = false;
    @observable isPrincipal4 = false;
    @observable isPrincipal5 = false;
    @observable isPrincipal6 = false;

    @observable volume = 10;

    @action activateMicro(micro: string) {
        switch (micro) {
            case '1':
                this.comparedMicro1Activated = true;
                break;
            case '2':
                this.comparedMicro2Activated = !this.comparedMicro2Activated
                break;
            case '3':
                this.comparedMicro3Activated = !this.comparedMicro3Activated
                break;
            case '4':
                this.comparedMicro4Activated = !this.comparedMicro4Activated
                break;

            case '5':
                this.comparedMicro5Activated = !this.comparedMicro5Activated
                break;
            case '6':
                this.comparedMicro6Activated = !this.comparedMicro6Activated
                break;
            case 'all':
                if (this.comparedMicro1Activated &&
                    this.comparedMicro2Activated &&
                    this.comparedMicro3Activated &&
                    this.comparedMicro4Activated &&
                    this.comparedMicro5Activated &&
                    this.comparedMicro6Activated) {
                    this.comparedMicro1Activated = true;
                    this.comparedMicro2Activated = false;
                    this.comparedMicro3Activated = false;
                    this.comparedMicro4Activated = false;
                    this.comparedMicro5Activated = false;
                    this.comparedMicro6Activated = false;
                } else {
                    this.comparedMicro1Activated = true
                    this.comparedMicro2Activated = true;
                    this.comparedMicro3Activated = true;
                    this.comparedMicro4Activated = true;
                    this.comparedMicro5Activated = true;
                    this.comparedMicro6Activated = true;
                }
                break;
        }
    }

    @action onChangeVolume(val) {
        this.volume = val;
    }
    //--------------------------------SAVE DATA LABELED --------------------------------//


    @observable playingSuggestion = false;
    @observable selected1 = false;
    @observable selected2 = false;
    @observable selected3 = false;
    @observable selected4 = false;
    @observable selected5 = false;
    @observable selected6 = false;
    @observable isSomethingSelected = false;


    @observable selected1Sel = false;
    @observable selected2Sel = false;

    @observable isPlaying = false;
    @observable verified = false;

    @action updateMark() {
        this.verified = true;
    }

    @action playBirdSong(url, seconds) {
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
                seconds * 1000)
        }

    }

    //Without AI

    @observable isNoteActivated = false;
    @observable commonName;
    @observable sciName;
    @observable sex;
    @observable type;

    @action onSexChange() {

    }
    @action onTypeChange() {

    }

    @action onSciNameChange() {
        let label = ''
        reportStore.birdsData.map((e, i) => {
            if (e.SCI_NAME == this.sciName) {
                label = e.SPA_NAME + ' (' + e.SCI_NAME + ')';
            }
        })
        return label
    }

    @action onNoteClick() {
        this.isNoteActivated = true;
    }

    @action onSaveClick() {
        let _commonName;
        reportStore.birdsData.map((e, i) => {
            if (e.SCI_NAME == this.sciName) {
                _commonName = e.SPA_NAME;
            }
        })
        reportStore.onSaveDataLabeled(this.sciName, _commonName, this.sex, this.type);
        this.isDataLabeling = false;
    }

    @action onCloseLabelingClick() {
        this.isDataLabeling = false;
        this.commonName = '';
        this.sciName = '';
        this.sex = '';
        this.type = '';
    }

    @action selectMark(url, index) {
        if (this.isGeneralSpectro) {
            switch (index) {
                case 1:
                    if (!this.selected1) {
                        this.playBirdSong(url, 5);
                        this.isSomethingSelected = true;
                        this.selected2 = false;
                        this.selected3 = false;
                        this.selected4 = false;
                        this.selected5 = false;
                        this.selected6 = false;
                        this.selected1Sel = false;
                        this.selected2Sel = false;
                    } else {
                        this.isSomethingSelected = false;
                    }
                    this.selected1 = !this.selected1;
                    break;
                case 2:
                    if (!this.selected2) {
                        this.playBirdSong(url, 5);
                        this.isSomethingSelected = true;
                        this.selected1 = false;
                        this.selected3 = false;
                        this.selected4 = false;
                        this.selected5 = false;
                        this.selected6 = false;
                        this.selected1Sel = false;
                        this.selected2Sel = false;
                    } else {
                        this.isSomethingSelected = false;
                    }
                    this.selected2 = !this.selected2;
                    break;
                case 3:
                    if (!this.selected3) {
                        this.playBirdSong(url, 5);
                        this.isSomethingSelected = true;
                        this.selected2 = false;
                        this.selected1 = false;
                        this.selected4 = false;
                        this.selected5 = false;
                        this.selected6 = false;
                        this.selected1Sel = false;
                        this.selected2Sel = false;
                    } else {
                        this.isSomethingSelected = false;
                    } this.selected3 = !this.selected3;
                    break;
                case 4:
                    if (!this.selected4) {
                        this.playBirdSong(url, 5)
                        this.isSomethingSelected = true;
                        this.selected2 = false;
                        this.selected3 = false;
                        this.selected1 = false;
                        this.selected5 = false;
                        this.selected6 = false;
                        this.selected1Sel = false;
                        this.selected2Sel = false;
                    } else {
                        this.isSomethingSelected = false;
                    } this.selected4 = !this.selected4;
                    break;
                case 5:
                    if (!this.selected5) {
                        this.playBirdSong(url, 5)
                        this.isSomethingSelected = true;
                        this.selected2 = false;
                        this.selected3 = false;
                        this.selected4 = false;
                        this.selected1 = false;
                        this.selected6 = false;
                        this.selected1Sel = false;
                        this.selected2Sel = false;
                    } else {
                        this.isSomethingSelected = false;
                    } this.selected5 = !this.selected5;
                    break;
                case 6:
                    if (!this.selected6) {
                        this.playBirdSong(url, 5)
                        this.isSomethingSelected = true;
                        this.selected2 = false;
                        this.selected3 = false;
                        this.selected4 = false;
                        this.selected5 = false;
                        this.selected1 = false;
                        this.selected1Sel = false;
                        this.selected2Sel = false;
                    } else {
                        this.isSomethingSelected = false;
                    } this.selected6 = !this.selected6;
                    break;
            }
        }
    }

    @action selectMarkSel(url, index) {
        if (!this.isGeneralSpectro) {
            switch (index) {
                case 1:
                    if (!this.selected1Sel) {
                        this.playBirdSong(url, 5);
                        this.isSomethingSelected = true;
                        this.selected1Sel = false;
                        this.selected2Sel = false;
                        this.selected1 = false;
                        this.selected2 = false;
                        this.selected3 = false;
                        this.selected4 = false;
                        this.selected5 = false;
                        this.selected6 = false;
                    } else {
                        this.isSomethingSelected = false;
                    }
                    this.selected1Sel = !this.selected1Sel;
                    break;
                case 2:
                    if (!this.selected2) {
                        this.playBirdSong(url, 5);
                        this.isSomethingSelected = true;
                        this.selected1Sel = false;
                        this.selected2Sel = false;
                        this.selected1 = false;
                        this.selected2 = false;
                        this.selected3 = false;
                        this.selected4 = false;
                        this.selected5 = false;
                        this.selected6 = false;
                    } else {
                        this.isSomethingSelected = false;
                    }
                    this.selected2Sel = !this.selected2Sel;
                    break;
            }
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