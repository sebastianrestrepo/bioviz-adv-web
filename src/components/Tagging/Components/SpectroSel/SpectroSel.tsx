import React from 'react';
import './_SpectroSel.scss'
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import * as CSS from 'csstype';
import toolsStore from '../../../../stores/toolsStore';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';

const SpectroSel = () => {

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
                    height: 350,
                    labels: true,
                }),
                Timeline.create({
                    /*formatTimeCallback: toolsStore.formatTimeCallback(3000, 20),
                    timeInterval: toolsStore.timeInterval(20),
                    primaryLabelInterval: toolsStore.primaryLabelInterval(20),
                    secondaryLabelInterval: toolsStore.secondaryLabelInterval(20),*/
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

        toolsStore.wsSelectionRef = wsRef.current;
        //toolsStore.loadSelection(1000, 5000);
    }, []);

    return (<div className="sel-cont" >

        <div className="container-sel">

            {/*<div id="timeline" ref={containerTimelineRef} onClick={() => {
                wsRef.current.zoom(2000);
                console.log('lmao');
            }} />*/}
            <div id="timeline" ref={containerTimelineRef} />
            <div id="waveform" ref={containerRef}>
                <div id="wave-spectrogram" ref={containerSpecRef} />
            </div>

        </div>
    </div>);
}

export default SpectroSel;