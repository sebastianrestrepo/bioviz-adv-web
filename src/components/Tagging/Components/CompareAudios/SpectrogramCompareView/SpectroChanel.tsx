import React, { useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import toolsStore from '../../../../../stores/toolsStore';

interface spectroChannelProps {
    microNum: any;
}

const SpectroChanel = ({ microNum}: spectroChannelProps) => {

    // Selección Spectro
    const containerRef: any = React.useRef();
    const containerSpecRef: any = React.useRef();
    const containerTimelineRef: any = React.useRef();
    const wsRef: any = React.useRef();
    const sliderRef: any = React.useRef();
    const containerRegion: any = React.useRef();
    const silderRef = React.createRef();

    React.useEffect(() => {
        wsRef.current = WaveSurfer.create({
            container: containerRef.current,
            waveColor: 'rgba(175, 234, 125, 0.01)',
            progressColor: 'rgba(137, 212, 110, 0.01)',
            cursorWidth: 4,
            cursorColor: '#AFEA7D',
            height: 220,
            plugins: [
                Spectrogram.create({
                    wavesurfer: wsRef.current,
                    container: containerSpecRef.current,
                    height: 220,
                    labels: true,
                }),
                Timeline.create({
                    container: containerTimelineRef.current,
                    primaryColor: '#838383',
                    secondaryColor: '#838383',
                    primaryFontColor: '#838383',
                    secondaryFontColor: '#838383',
                    primaryLabelInterval: 1,
                    secondaryLabelInterval: 1
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
                })
            ]
        });

        switch (microNum) {
            case '1':
                toolsStore.wsSelectionRef = wsRef.current;
                break;
            case '2':
                toolsStore.wsM2Ref = wsRef.current;
                break;
            case '3':
                toolsStore.wsM3Ref = wsRef.current;
                break;
            case '4':
                toolsStore.wsM4Ref = wsRef.current;
                break;
            case '5':
                toolsStore.wsM5Ref = wsRef.current;
                break;
            case '6':
                toolsStore.wsM6Ref = wsRef.current;
                break;
        }
        //wsReference = wsRef.current;
        toolsStore.containerTimelineRef = containerTimelineRef.current;
    }, []);

    return (<div className="sel-cont">

        <div className="spectro-header">
            <div id="timeline" ref={containerTimelineRef} />
        </div>
        <div className="container-sel">
            <div id="waveform" ref={containerRef}>
                <div id="wave-spectrogram" ref={containerSpecRef} />
            </div>

        </div>
    </div>);
}

export default SpectroChanel;