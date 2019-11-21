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
interface spectroSelProps {
    regionEnd: any;
    regionStart: any;
    specWidth: any;
}
const SpectroSel = ({regionEnd, regionStart, specWidth} : spectroSelProps) => {

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
            waveColor: 'rgba(175, 234, 125, 0.05)',
            progressColor: 'rgba(137, 212, 110, 0.05)',
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
                    primaryFontColor:'#838383',
                    secondaryFontColor:'#838383',
                }),
                /*Minimap.create({
                    container: containerSpecSel.current,
                    waveColor: '#777',
                    progressColor: '#222',
                    height: 50
                }),*/
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
                Regions.create({
                    regions: [
                        {
                            container: containerRegion.current,
                            id: 'rg-2',
                            start: 1,
                            end: 3,
                            loop: false,
                            color: 'rgba(60, 238, 89, 0.2)',
                        }
                    ],
                }),
            ]
        });

        wsRef.current.load('/data/Anchicaya_LaLocaTrocha_2019.06.22_07.50.35_1_mitad.mp3');

        //console.log();
    }, []);
    
    const SpectroSelStyles: CSS.Properties = {
        width: specWidth*3 + 'px',
        
    }

    const spectroSettingsChange = () => {
        wsRef.current.start(regionStart);
    }

    return (<div className="container-sel">

        <div id="timeline" style={SpectroSelStyles} ref={containerTimelineRef}  />
        <div id="waveform" ref={containerRef}>
            <div id="wave-spectrogram" style={SpectroSelStyles}ref={containerSpecRef} />
        </div>

    </div>);
}

export default SpectroSel;