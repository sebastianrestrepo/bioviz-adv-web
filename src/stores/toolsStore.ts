import { observable, autorun, action } from 'mobx';
import { Decoder, BufferManipulations, Encoder } from 'alamp';

class ToolsStore {

    @observable wsRef: any;
    @observable regionStart: any;
    @observable regionEnd: any;
    @observable genSpecWidth: number = 0;
    @observable selSpecLeftPos: number = 0;
    @observable selSpecWidth: number = 0;
    
    //
    @observable wsSelectionRef: any;
    //
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
                console.log('LELAZO', that.wsRef.regions.list[id]);
                console.log('ws', that.wsRef.spectrogram.drawer.width);
                that.regionStart = region.start;
                that.regionEnd = region.end;
                that.genSpecWidth = that.wsRef.spectrogram.drawer.width;
                console.log('that region start',  that.regionStart);
                console.log('normie region start',  region.start);
                return {
                    start: region.start,
                    end: region.end,
                    attributes: region.attributes,
                    data: region.data
                };
            })
        );
        this.settingsSelSpectro();
        console.log('OUTSIDE that region start',  that.regionStart);
        this.loadSelection(that.regionStart *1000, that.regionEnd*1000);
    }


    settingsSelSpectro(){
        let secondWidth = this.genSpecWidth/59;
        this.selSpecLeftPos = -secondWidth*this.regionStart;
        console.log('LEFT POS=', this.selSpecLeftPos)
        this.selSpecWidth =  secondWidth*(this.regionEnd-this.regionStart)
    }

    async loadSelection(start: number, end: number) {
        const decoder = new Decoder();
        // Lo decodifico, para poder cortarlo
        let blob = await fetch('/assets/audio-files/1_AnchicayaLaLocaCarretera_2019-06-18_06-34_min.mp3').then(r => r.blob());
        const buf = await decoder.decodeFile(blob);
        // Esta clase recibe el audio decodificado y permite hacer algunas modificaciones
        const manipulator = new BufferManipulations(buf);
        // Crop a piece of audio. From 1st second to 5th second.
        manipulator.cut(start, end);
        // Apply cuts and fades and get modified buffer.
        const processedBuffer = await manipulator.apply();

        const encoder = new Encoder();

        // Encode modified buffer to MP3 data. Este es el blob que deberia cargarse en el wave
        const newBlob = await encoder.encodeToMP3Blob(processedBuffer, 196);
        // Your file blob is ready here. Esta es una url del blob que utilizo par poder descargar el archivo
        //let modified = URL.createObjectURL(newBlob);

        // Aqui cargo el audio a wavesurfer como un blob, ya solo seria configurar el espectrograma y eso, pero si funciona
        this.wsSelectionRef.loadBlob(newBlob);

        //wsRef.current.load('/assets/audio-files/1_AnchicayaLaLocaCarretera_2019-06-18_06-34_min.mp3');
        console.log('uy', this.wsSelectionRef);
    }

    //FINAL DE LA CLASE TOOLS STORE
}

const toolsStore = new ToolsStore();

export default toolsStore;