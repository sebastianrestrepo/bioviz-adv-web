import React, { useState } from 'react';
import './_SpectroSel.scss'
import WaveSurfer from 'wavesurfer.js';
import Spectrogram from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.js';
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import SliderFreq from './SliderFreq';
import toolsStore from '../../../../stores/toolsStore';

interface spectroSelProps {
    handlersValue: any,
    rSpectro: any,
    gSpectro: any,
    bSpectro: any,
    rBack: any,
    gBack: any,
    bBack: any,
    whiteAndBlack: any,
    contrastVal: any,
    brightVal: any,
}

const SpectroSel = ({ 
    handlersValue, 
    rSpectro,
    gSpectro,
    bSpectro,
    rBack,
    gBack,
    bBack,
    whiteAndBlack,
    contrastVal,
    brightVal,
}: spectroSelProps) => {

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

    return (<div className="sel-cont">

        <div className="spectro-header">
            <div style={{ width: '37px', height: '100%', backgroundColor: '#FFF' }}></div>
            <img className="" src="./assets/gen-icons/freq-filter-icon.svg" alt="" width="25" />
            <div id="timeline" ref={containerTimelineRef} />
        </div>
        <div className="container-sel">
            <img className="" src="./assets/tagging-section/frequency-label.png" alt="" height="220" />
            <SliderFreq />
            <div id="waveform" ref={containerRef}>
                <div className="top-filter" key={handlersValue[1]} style={{
                    height: (handlersValue[1]) + '%',
                }}></div>
                {/*<h3 style={{ display: (selectionEmpty)?'flex':'none'}}>Selecciona un área del espectrograma general</h3>*/}
                <svg className="duotone-filter" xmlns="http://www.w3.org/2000/svg" key={toolsStore.rSpectro + "" + toolsStore.rBack}>
       <filter id="duotone-1" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
       <feColorMatrix type="matrix" result="gray" values=".33 .33 .33 0 0
 .33 .33 .33 0 0
 .33 .33 .33 0 0
 0 0 0 1 0"></feColorMatrix>

    <feComponentTransfer colorInterpolationFilters="sRGB" result="duotone">
    <feFuncR type="table" tableValues={rSpectro/255 + " " + rBack/255}></feFuncR>            
    <feFuncB type="table" tableValues={gSpectro/255 + " " + gBack/255}></feFuncB>
    <feFuncG type="table" tableValues={bSpectro/255 + " " + bBack/255}></feFuncG>
                {(whiteAndBlack)
            ?<feFuncA type="table" tableValues="0 0"></feFuncA>
            :<feFuncA type="table" tableValues="0 1"></feFuncA>}
        </feComponentTransfer>
    <feBlend mode="normal" in="componentTransfer" in2="SourceGraphic" result="blend"/>
       </filter>
   </svg>
                <div id="wave-spectrogram" ref={containerSpecRef} style={{
                    filter: 'brightness(' + brightVal + ') contrast(' + contrastVal + ') url(#duotone-1)',
                }} />
                <div className="bottom-filter" style={{
                    bottom: (handlersValue[0]) + '%',
                }}></div>
            </div>

        </div>
    </div>);
}

export default SpectroSel;