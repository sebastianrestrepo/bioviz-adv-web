import { observable, autorun, action } from 'mobx';

class ToolsStore {

    @observable wsRef: any;
    @observable regionStart: any;
    @observable regionEnd: any;
    @observable genSpecWidth: number = 0;
    @observable selSpecLeftPos: number = 0;
    @observable selSpecWidth: number = 0;
    constructor() {
    }

    @action handlePlay = () => {
        this.wsRef.play();
    }

    @action handlePause = () => {
        this.wsRef.pause();
    }

    @action saveRegions() {
        let that = this;
        localStorage.regions = JSON.stringify(
            Object.keys(this.wsRef.regions.list).map(function (id) {
                var region = that.wsRef.regions.list[id];
                console.log('ws', that.wsRef.spectrogram.drawer.width);
                that.regionStart = region.start;
                that.regionEnd = region.end;
                that.genSpecWidth = that.wsRef.spectrogram.drawer.width;
                return {
                    start: region.start,
                    end: region.end,
                    attributes: region.attributes,
                    data: region.data
                };
            })
        );
        this.settingsSelSpectro();
    }
    settingsSelSpectro(){
        let secondWidth = this.genSpecWidth/150;
        this.selSpecLeftPos = -secondWidth*this.regionStart;
        console.log('LEFT POS=', this.selSpecLeftPos)
        this.selSpecWidth =  secondWidth*(this.regionEnd-this.regionStart)

    }
}

const toolsStore = new ToolsStore();

export default toolsStore;