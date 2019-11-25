import * as React from 'react';
import './_compareAudios.scss';
import { observer } from 'mobx-react';
import { SpectrogramCompareView } from './SpectrogramCompareView/SpectrogramCompareView';
import tagStore from '../../../../stores/taggingStore';

@observer
export class CompareAudios extends React.Component {

    render() {
        return <div className="compare-section">
            <div className="left">
                <h1>Comparando audios</h1>
                <span className="line-row">
                    <h3>Micrófono principal: {} </h3>
                    <img src="./assets/pinned.svg" height="20px" alt="" />
                    <span className="tooltip">
                        <img src="./assets/question-helper.svg" height="15px" alt="" />
                        <span className="tooltiptext">
                            Cambia el espectograma con el que se visualiza principalmente en el software.
                        </span>
                    </span>
                </span>
                <br />
                <div className="circle-container">
                    <span className="micro-btn" onClick={() => tagStore.activateMicro('1')} >
                        {
                            (tagStore.comparedMicro1Activated) ?
                                <img className="active-micro-1" src="./assets/tagging-section/compareAudios/microphone-green.svg" alt="" />
                                :
                                <img className="disabled-micro-1" src="./assets/tagging-section/compareAudios/microphone-gray.svg" alt="" />
                        }
                        <p className={(tagStore.comparedMicro1Activated) ? "active" : "disabled"}>M1</p>
                    </span>
                    <span className="micro-btn" onClick={() => tagStore.activateMicro('2')} >
                        {
                            (tagStore.comparedMicro2Activated) ?
                                <img className="active-micro-1" src="./assets/tagging-section/compareAudios/microphone-green.svg" alt="" />
                                :
                                <img className="disabled-micro-1" src="./assets/tagging-section/compareAudios/microphone-gray.svg" alt="" />
                        }
                        <p className={(tagStore.comparedMicro2Activated) ? "active" : "disabled"}>M2</p>
                    </span>
                    <span className="micro-btn" onClick={() => tagStore.activateMicro('3')} >
                        {
                            (tagStore.comparedMicro3Activated) ?
                                <img className="active-micro-1" src="./assets/tagging-section/compareAudios/microphone-green.svg" alt="" />
                                :
                                <img className="disabled-micro-1" src="./assets/tagging-section/compareAudios/microphone-gray.svg" alt="" />
                        }
                        <p className={(tagStore.comparedMicro3Activated) ? "active" : "disabled"}>M3</p>

                    </span>
                    <span className="micro-btn" onClick={() => tagStore.activateMicro('4')} >
                        {
                            (tagStore.comparedMicro4Activated) ?
                                <img className="active-micro-1" src="./assets/tagging-section/compareAudios/microphone-green.svg" alt="" />
                                :
                                <img className="disabled-micro-1" src="./assets/tagging-section/compareAudios/microphone-gray.svg" alt="" />
                        }
                        <p className={(tagStore.comparedMicro4Activated) ? "active" : "disabled"}>M4</p>

                    </span>
                    <span className="micro-btn" onClick={() => tagStore.activateMicro('5')} >
                        {
                            (tagStore.comparedMicro5Activated) ?
                                <img className="active-micro-1" src="./assets/tagging-section/compareAudios/microphone-green.svg" alt="" />
                                :
                                <img className="disabled-micro-1" src="./assets/tagging-section/compareAudios/microphone-gray.svg" alt="" />
                        }
                        <p className={(tagStore.comparedMicro5Activated) ? "active" : "disabled"}>M5</p>

                    </span>
                    <span className="micro-btn" onClick={() => tagStore.activateMicro('6')} >
                        {
                            (tagStore.comparedMicro6Activated) ?
                                <img className="active-micro-1" src="./assets/tagging-section/compareAudios/microphone-green.svg" alt="" />
                                :
                                <img className="disabled-micro-1" src="./assets/tagging-section/compareAudios/microphone-gray.svg" alt="" />
                        }
                        <p className={(tagStore.comparedMicro6Activated) ? "active" : "disabled"}>M6</p>
                    </span>
                    <span className="center" onClick={() => tagStore.activateMicro('all')}>
                        <img src="./assets/tagging-section/compareAudios/microarray_center.svg" alt="" />
                    </span>
                </div>
            </div>

            <div className="right">
                <span className="principal-micro">
                    <SpectrogramCompareView name={'M1'} spectroNum={'1'} volume={50} />
                </span>
                {
                    (tagStore.comparedMicro1Activated && !tagStore.isPrincipal1) ? 
                    <SpectrogramCompareView name={'M2'} spectroNum={'1'} volume={50}/> : ''
                }
                {
                    (tagStore.comparedMicro2Activated && !tagStore.isPrincipal2) ? 
                    <SpectrogramCompareView name={'M2'} spectroNum={'2'} volume={50}/> : ''
                }
                {
                    (tagStore.comparedMicro3Activated && !tagStore.isPrincipal3) ? 
                    <SpectrogramCompareView name={'M3'} spectroNum={'3'} volume={50}/> : ''
                }
                {
                    (tagStore.comparedMicro4Activated && !tagStore.isPrincipal4) ? 
                    <SpectrogramCompareView name={'M4'} spectroNum={'4'} volume={50} /> : ''
                }
                {
                    (tagStore.comparedMicro5Activated && !tagStore.isPrincipal5) ? 
                    <SpectrogramCompareView name={'M5'} spectroNum={'5'} volume={50}/> : ''
                }
                {
                    (tagStore.comparedMicro6Activated && !tagStore.isPrincipal6) ? 
                    <SpectrogramCompareView name={'M6'} spectroNum={'6'} volume={50}/> : ''
                }
            </div>
        </div>
    }
}