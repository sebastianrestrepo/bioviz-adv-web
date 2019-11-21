import { observable, autorun, action } from 'mobx';
import { Decoder, BufferManipulations, Encoder } from 'alamp';

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

@action async cropAudio(){
    const decoder = new Decoder();
    // Lo decodifico, para poder cortarlo
    let blob = await fetch('/assets/audio-files/1_AnchicayaLaLocaCarretera_2019-06-18_06-34_min.mp3').then(r => r.blob());
    const buf = await decoder.decodeFile(blob);
    // Esta clase recibe el audio decodificado y permite hacer algunas modificaciones
    const manipulator = new BufferManipulations(buf);
    // Crop a piece of audio. From 1st second to 5th second.
    manipulator.cut(1000, 5000);
    // Apply cuts and fades and get modified buffer.
    const processedBuffer = await manipulator.apply();

    const encoder = new Encoder();

  
    // Encode modified buffer to MP3 data. Este es el blob que deberia cargarse en el wave
    return await encoder.encodeToMP3Blob(processedBuffer, 196);

}

    settingsSelSpectro(){
        let secondWidth = this.genSpecWidth/59;
        this.selSpecLeftPos = -secondWidth*this.regionStart;
        console.log('LEFT POS=', this.selSpecLeftPos)
        this.selSpecWidth =  secondWidth*(this.regionEnd-this.regionStart)

    }
}

const toolsStore = new ToolsStore();

export default toolsStore;