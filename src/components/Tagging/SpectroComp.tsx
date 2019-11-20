import React from 'react';
import './_SpectroComp.scss'
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import Minimap from 'wavesurfer.js/dist/plugin/wavesurfer.minimap';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import taggingStore from '../../stores/taggingStore';

const SpectroComp = () => {

    // General Spectrogram
    const containerRef: any = React.useRef();
    const containerSpecRef: any = React.useRef();
    const containerTimelineRef: any = React.useRef();
    const wsRef: any = React.useRef();
    const sliderRef: any = React.useRef();
    const containerRegion: any = React.useRef();

    // Selección Spectro
    const containerSpecSel: any = React.useRef();

    React.useEffect(() => {
        wsRef.current = WaveSurfer.create({
            container: containerRef.current,
            waveColor: 'rgba(175, 234, 125, 0.05)',
            progressColor: 'rgba(137, 212, 110, 0.05)',
            cursorWidth: 4,
            cursorColor: '#AFEA7D',
            height: 120,
            plugins: [
                Spectrogram.create({
                    wavesurfer: wsRef.current,
                    container: containerSpecRef.current,
                    height: 120,
                    labels: true
                }),
                Timeline.create({
                    container: containerTimelineRef.current
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
                            id: 'rg',
                            start: 1,
                            end: 3,
                            loop: false,
                            color: 'rgba(60, 238, 89, 0.2)',
                        }
                    ],
                }),
            ]
        });

        wsRef.current.on('ready', function () {
            wsRef.current.play();
        });

        wsRef.current.load('/data/Anchicaya_LaLocaTrocha_2019.06.22_07.50.35_1_mitad.mp3');

        taggingStore.wsRef = wsRef.current;
    }, []);


    function saveRegions() {
        localStorage.regions = JSON.stringify(
            Object.keys(wsRef.current.regions.list).map(function(id) {
                var region = wsRef.current.regions.list[id];
                console.log(region);
                console.log(region.start);
                return {
                    start: region.start,
                    end: region.end,
                    attributes: region.attributes,
                    data: region.data
                };
            })
        );
    }

    const handleSliderChange = () => {
        sliderRef.current.oninput = function () {
            var zoomLevel = Number(sliderRef.current.value);
            wsRef.current.zoom(zoomLevel);
        };
    }

    return (<div className="container">

        <div id="timeline" ref={containerTimelineRef} />
        <div id="waveform" ref={containerRef}>
            <div id="wave-spectrogram" ref={containerSpecRef} />
        </div>

    </div>);
}

export default SpectroComp;