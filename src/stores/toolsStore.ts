import { observable, autorun, action } from 'mobx';
import { Decoder, BufferManipulations, Encoder } from 'alamp';
import p5 from 'p5';
import "p5/lib/addons/p5.sound";
import * as CSS from 'csstype';
import WaveSurfer from 'wavesurfer.js';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import tagStore from './taggingStore';
import { palette } from '@material-ui/system';

class ToolsStore {

    @observable showMarksInSelection: boolean = false;

    @observable isPlaying: boolean = false;
    @observable wsRef: any;
    @observable containerTimelineRef: any;
    @observable regionStart: any;
    @observable regionEnd: any;
    @observable genSpecWidth: number = 0;
    @observable selSpecLeftPos: number = 0;
    @observable selSpecWidth: number = 0;
    @observable counter = 0;
    @observable selectionEmpty = true;

    //
    @observable wsSelectionRef: any;
    @observable wsM2Ref: any;
    @observable wsM3Ref: any;
    @observable wsM4Ref: any;
    @observable wsM5Ref: any;
    @observable wsM6Ref: any;
    //

    //---------------------------------Panel selection -----------------------------//
    @observable panel: number = 0;
    @observable panelActivated: string = '1px solid #ECECEC';
    @observable panelDisabled: string = '0px solid #ECECEC';

    @observable onDestroy: boolean = false;

    @observable handlersValue: any = [0, 0];

    //-----------------Spectro Color-------------//
    //@observable palette: number = 0;

    @observable whiteAndBlack: boolean = true;
    @observable rSpectro: any;
    @observable gSpectro: any;
    @observable bSpectro: any;

    @observable rBack: any;
    @observable gBack: any;
    @observable bBack: any;

    constructor() {

    }

    @action setHandlerValue(newValue) {
        this.handlersValue = newValue;
    }

    @action changeSpectrogramColor(palette: number) {
        switch (palette) {
            case 0:
                this.whiteAndBlack = true;
                break;
            case 1:
                this.rSpectro = 234;
                this.gSpectro = 30;
                this.bSpectro = 0;

                this.rBack = 255;
                this.gBack = 227;
                this.bBack = 94;

                this.whiteAndBlack = false;
                console.log('OSSA' + palette, this.rSpectro)
                break;
            case 2:
                this.rSpectro = 122;
                this.gSpectro = 0;
                this.bSpectro = 192;

                this.rBack = 33;
                this.gBack = 255;
                this.bBack = 21;

                this.whiteAndBlack = false;
                console.log('OSSA' + palette, this.rSpectro)
                break;
            case 3:
                this.rSpectro = 0;
                this.gSpectro = 3;
                this.bSpectro = 252;

                this.rBack = 0;
                this.gBack = 251;
                this.bBack = 130;

                this.whiteAndBlack = false;
                break;
            case 4:
                this.rSpectro = 0;
                this.gSpectro = 68;
                this.bSpectro = 27;

                this.rBack = 241;
                this.gBack = 250;
                this.bBack = 238;

                this.whiteAndBlack = false;
                break;
            case 5:
                this.rSpectro = 130;
                this.gSpectro = 0;
                this.bSpectro = 38;

                this.rBack = 255;
                this.gBack = 255;
                this.bBack = 197;

                this.whiteAndBlack = false;
                break;
            case 6:
                this.rSpectro = 255;
                this.gSpectro = 0;
                this.bSpectro = 255;

                this.rBack = 255;
                this.gBack = 255;
                this.bBack = 0;

                this.whiteAndBlack = false;
                break;
        }
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

        this.counter++;
        if (this.counter > 1) {
            //this.wsSelectionRef.destroyPlugin('timeline');
            this.onDestroy = true;
        }

        this.loadSelection(that.regionStart * 1000, that.regionEnd * 1000);
        if (tagStore.isComparingMicros) {
        this.updateWsRefs() }
        /* if(this.onDestroy){
             this.wsSelectionRef.addPlugin(WaveSurfer.timeline.create({
                 container: this.containerTimelineRef,
                 primaryColor: '#838383',
                 secondaryColor: '#838383',
                 primaryFontColor: '#838383',
                 secondaryFontColor: '#838383',
             })).initPlugin('timeline');
             this.onDestroy = false;
         }*/

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
        let blob = await fetch('./assets/audio-files/1_AnchicayaLaLocaCarretera_2019-06-18_06-34_min.mp3').then(r => r.blob());
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
        this.selectionEmpty = false;
    }

    updateWsRefs() {
        let audios = [
            {
                microNum: '2',
                audio: './assets/audio-files/2_AnchicayaLaLocaCarretera_2019-06-18_06-34_min.mp3',
                open: tagStore.comparedMicro2Activated
            },
            {
                microNum: '3',
                audio: './assets/audio-files/3_AnchicayaLaLocaCarretera_2019-06-18_06-34_min.mp3',
                open: tagStore.comparedMicro3Activated
            },
            {
                microNum: '4',
                audio: './assets/audio-files/4_AnchicayaLaLocaCarretera_2019-06-18_06-34_min.mp3',
                open: tagStore.comparedMicro4Activated

            },
            {
                microNum: '5',
                audio: './assets/audio-files/5_AnchicayaLaLocaCarretera_2019-06-18_06-34_min.mp3',
                open: tagStore.comparedMicro5Activated

            },
            {
                microNum: '6',
                audio: './assets/audio-files/6_AnchicayaLaLocaCarretera_2019-06-18_06-34_min.mp3',
                open: tagStore.comparedMicro6Activated

            }
        ]
        audios.map((e) => {
            (e.open) ?  this.loadSpectroSel(this.regionStart * 1000, this.regionEnd * 1000, e.audio, e.microNum) : console.log()

        })
    }
    async loadSpectroSel(start: number, end: number, audio: string, microNum: any) {
        const decoder = new Decoder();
        // Lo decodifico, para poder cortarlo
        let blob = await fetch(audio).then(r => r.blob());
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
        switch (microNum) {
            case '1':
                this.wsSelectionRef.loadBlob(newBlob);
                break;
            case '2':
                this.wsM2Ref.loadBlob(newBlob);
                break;
            case '3':
                this.wsM3Ref.loadBlob(newBlob);
                break;
            case '4':
                this.wsM4Ref.loadBlob(newBlob);
                break;
            case '5':
                this.wsM5Ref.loadBlob(newBlob);
                break;
            case '6':
                this.wsM6Ref.loadBlob(newBlob);
                break;
        }

        //wsRef.current.load('/assets/audio-files/1_AnchicayaLaLocaCarretera_2019-06-18_06-34_min.mp3');
        this.selectionEmpty = false;
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
