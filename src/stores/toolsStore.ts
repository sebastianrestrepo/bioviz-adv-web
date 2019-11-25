import { observable, autorun, action } from 'mobx';
import { Decoder, BufferManipulations, Encoder } from 'alamp';
import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import * as CSS from 'csstype';

class ToolsStore {

    @observable isPlaying: boolean = false;
    @observable wsRef: any;
    @observable regionStart: any;
    @observable regionEnd: any;
    @observable genSpecWidth: number = 0;
    @observable selSpecLeftPos: number = 0;
    @observable selSpecWidth: number = 0;


    //
    @observable wsSelectionRef: any;
    //

    //---------------------------------Panel selection -----------------------------//
    @observable panel: number = 0;
    @observable panelActivated: string = '1.5px solid #44CD88';
    @observable panelDisabled: string = '0px solid #44CD88';

    constructor() {

    }

    @action handlePlayPause() {
        switch (this.panel) {
            case 0:
                this.wsRef.playPause();
                break;
            case 1:
                this.wsRef.playPause();
                break;
            case 2:
                this.wsSelectionRef.playPause();
                break;
        }
    }

    @action handlePause() {
        switch (this.panel) {
            case 0:
                this.wsSelectionRef.pause();
                break;
            case 1:
                this.wsSelectionRef.pause();
                break;
            case 2:
                this.wsRef.pause();
                break;
        }
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
                console.log('Timeline', that.wsRef.timeline);
                console.log('that region start', that.regionStart);
                console.log('normie region start', region.start);
                return {
                    start: region.start,
                    end: region.end,
                    attributes: region.attributes,
                    data: region.data
                };
            })
        );
        this.settingsSelSpectro();
        console.log('OUTSIDE that region start', that.regionStart);
        this.loadSelection(that.regionStart * 1000, that.regionEnd * 1000);
    }


    settingsSelSpectro() {
        let secondWidth = this.genSpecWidth / 59;
        this.selSpecLeftPos = -secondWidth * this.regionStart;
        console.log('LEFT POS=', this.selSpecLeftPos)
        this.selSpecWidth = secondWidth * (this.regionEnd - this.regionStart)
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

    // Override Timeline Formatting
    @action formatTimeCallback(seconds, pxPerSec) {
        seconds = Number(seconds);
        var minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        // fill up seconds with zeroes
        var secondsStr = Math.round(seconds).toString();
        if (pxPerSec >= 25 * 10) {
            secondsStr = seconds.toFixed(2);
        } else if (pxPerSec >= 25 * 1) {
            secondsStr = seconds.toFixed(1);
        }

        if (minutes > 0) {
            if (seconds < 10) {
                secondsStr = '0' + secondsStr;
            }
            return `${minutes}:${secondsStr}`;
        }
        return secondsStr;
    }

    @action timeInterval(pxPerSec) {
        var retval = 1;
        if (pxPerSec >= 25 * 100) {
            retval = 0.01;
        } else if (pxPerSec >= 25 * 40) {
            retval = 0.025;
        } else if (pxPerSec >= 25 * 10) {
            retval = 0.1;
        } else if (pxPerSec >= 25 * 4) {
            retval = 0.25;
        } else if (pxPerSec >= 25) {
            retval = 1;
        } else if (pxPerSec * 5 >= 25) {
            retval = 5;
        } else if (pxPerSec * 15 >= 25) {
            retval = 15;
        } else {
            retval = Math.ceil(0.5 / pxPerSec) * 60;
        }
        return retval;
    }

    @action primaryLabelInterval(pxPerSec) {
        var retval = 1;
        if (pxPerSec >= 25 * 100) {
            retval = 10;
        } else if (pxPerSec >= 25 * 40) {
            retval = 4;
        } else if (pxPerSec >= 25 * 10) {
            retval = 10;
        } else if (pxPerSec >= 25 * 4) {
            retval = 4;
        } else if (pxPerSec >= 25) {
            retval = 1;
        } else if (pxPerSec * 5 >= 25) {
            retval = 5;
        } else if (pxPerSec * 15 >= 25) {
            retval = 15;
        } else {
            retval = Math.ceil(0.5 / pxPerSec) * 60;
        }
        return retval;
    }

    @action secondaryLabelInterval(pxPerSec) {
        // draw one every 10s as an example
        return Math.floor(10 / this.timeInterval(pxPerSec));
    }

    //FINAL DE LA CLASE TOOLS STORE
}

const toolsStore = new ToolsStore();

export default toolsStore;