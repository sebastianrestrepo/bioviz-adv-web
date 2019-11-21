import React from 'react';
import './_SpectroSel.scss'
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import Minimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import toolsStore from '../../stores/toolsStore';
import * as CSS from 'csstype';
import { Decoder, BufferManipulations, Encoder } from 'alamp';

interface spectroSelProps {
    regionEnd: any;
    regionStart: any;
    specWidth: any;
    selSpecLeftPos: any;
    genSpecWidth: any;
}
const SpectroSel = ({ regionEnd, regionStart, specWidth, selSpecLeftPos, genSpecWidth }: spectroSelProps) => {

    // Selección Spectro
    const containerRef: any = React.useRef();
    const containerSpecRef: any = React.useRef();
    const containerTimelineRef: any = React.useRef();
    const wsRef: any = React.useRef();
    const sliderRef: any = React.useRef();
    const containerRegion: any = React.useRef();

    React.useEffect(() => {

        wsRef.current = WaveSurfer.create({
            container: containerRef.current,
            waveColor: 'rgba(175, 234, 125, 0.01)',
            progressColor: 'rgba(137, 212, 110, 0.01)',
            cursorWidth: 4,
            cursorColor: '#AFEA7D',
            height: 215,
            plugins: [
                Spectrogram.create({
                    wavesurfer: wsRef.current,
                    container: containerSpecRef.current,
                    height: 215,
                    labels: true,
                }),
                Timeline.create({
                    container: containerTimelineRef.current,
                    primaryColor: '#838383',
                    secondaryColor: '#838383',
                    primaryFontColor: '#838383',
                    secondaryFontColor: '#838383',
                }),
                Cursor.create({
                    showTime: true,
                    opacity: 0.8,
                    customShowTimeStyle: {
                        'background-color': '#000',
                        color: '#fff',
                        padding: '2px',
                        'font-size': '10px'
                    }
                }),
            ]
        });

        tryingBlob();
        //console.log();
    }, []);

    async function tryingBlob() {
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
        const newBlob = await encoder.encodeToMP3Blob(processedBuffer, 196);
        // Your file blob is ready here. Esta es una url del blob que utilizo par poder descargar el archivo
        //let modified = URL.createObjectURL(newBlob);

        // Aqui cargo el audio a wavesurfer como un blob, ya solo seria configurar el espectrograma y eso, pero si funciona
        wsRef.current.loadBlob(newBlob);

        //wsRef.current.load('/assets/audio-files/1_AnchicayaLaLocaCarretera_2019-06-18_06-34_min.mp3');
        console.log('uy', wsRef.current);
    }

    const SpectroWidthStyles: CSS.Properties = {
        width: specWidth + 'px',
        left: selSpecLeftPos + 'px',
    }

    const SpectroPosStyles: CSS.Properties = {
        left: selSpecLeftPos + 'px',
        width: genSpecWidth + 'px',
    }

    const spectroSettingsChange = () => {
        wsRef.current.start(regionStart);
    }

    return (<div className="sel-cont">
        <div className="container-sel">

            <div id="timeline" ref={containerTimelineRef} onClick={() => {
                wsRef.current.zoom(2000);
                console.log('lmao');
            }} />
            <div id="waveform" ref={containerRef}>
                <div id="wave-spectrogram" ref={containerSpecRef} />
            </div>

        </div>
    </div>);
}

export default SpectroSel;