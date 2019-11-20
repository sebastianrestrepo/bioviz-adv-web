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
}
const tagStore = new TaggingStore();

export default tagStore;