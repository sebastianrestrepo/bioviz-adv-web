import React from 'react';
import './_SpectroSel.scss'
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import * as CSS from 'csstype';
import toolsStore from '../../../../stores/toolsStore';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import Slider from '@material-ui/core/Slider';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';

interface spectroSelProps {
    selectionEmpty: any;
}

const SpectroSel = ({ selectionEmpty }: spectroSelProps) => {

    // Selección Spectro
    const containerRef: any = React.useRef();
    const containerSpecRef: any = React.useRef();
    const containerTimelineRef: any = React.useRef();
    const wsRef: any = React.useRef();
    const sliderRef: any = React.useRef();
    const containerRegion: any = React.useRef();
    const silderRef = React.createRef();
    let handlersValue: any = [24, 0];

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
                Regions.create({
                    dragSelection: {
                        slop: 5,
                        color: 'rgba(60, 238, 89, 0.2)',
                    }
                }),
            ]
        });

        toolsStore.wsSelectionRef = wsRef.current;
        toolsStore.containerTimelineRef = containerTimelineRef.current;
        //toolsStore.loadSelection(1000, 5000);
        wsRef.current.on('region-created', () => {
            if (Object.keys(wsRef.current.regions.list).length > 0) {
                let regionsArray = Object.keys(wsRef.current.regions.list);
                wsRef.current.regions.list[regionsArray[0]].remove();
            }
        });

    }, []);

    return (<div className="sel-cont" key={"" + handlersValue[1] + ""}>

        <div className="spectro-header">
            <div style={{ width: '53px', height: '100%', backgroundColor: '#FFF' }}></div>
            <img className="" src="./assets/gen-icons/freq-filter-icon.svg" alt="" width="28" />
            <div id="timeline" ref={containerTimelineRef} />
        </div>
        <div className="container-sel">
            <img className="" src="./assets/tagging-section/frequency-label.png" alt="" height="220" />
            <Slider
                ref={silderRef}
                orientation="vertical"
                defaultValue={[10, 15]}
                onChange={(event, value) => {
                    handlersValue = value;
                    console.log(handlersValue[1]);
                }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={24}
            />
            <div id="waveform" ref={containerRef} key={"" + handlersValue[1] + ""}>
                <div className="top-filter" key={"" + handlersValue[1] + ""} style={{
                    height: (handlersValue[1]*13.33333) + 'px',
                }}></div>
                {/*<h3 style={{ display: (selectionEmpty)?'flex':'none'}}>Selecciona un área del espectrograma general</h3>*/}
                <div id="wave-spectrogram" ref={containerSpecRef} />
                <div className="bottom-filter" style={{
                    top: (handlersValue[0]*13.33333),
                }}></div>
            </div>

        </div>
    </div>);
}

export default SpectroSel;