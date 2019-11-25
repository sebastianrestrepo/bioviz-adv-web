import * as React from 'react';
import './_AIGenSuggestions.scss';
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import chroma from 'chroma-js';
import { observer } from 'mobx-react';
import tagStore from '../../../../stores/taggingStore';

@observer
export class AIGenSuggestions extends React.Component {

    render() {
        return <div className="gen-spectro-section-A" >
            <span className="spectro-section">
                <div className="marks">
                    <span className={((tagStore.selected1) ? "mark selected" : "mark") /* + ((tagStore.isSomethingSelected && !tagStore.selected1) ? " prevent-hover" : "")*/}
                        onClick={() =>
                            tagStore.selectMark("./assets/audio-samples/vireon.wav", 1)}>
                        <img src={"./assets/marks/" + ((tagStore.verified) ? "ai-mark-verified" : "ai-mark-suggestion") + ".svg"}
                            width="17px" alt=""
                            className="mark-icon" />
                        <div className="bird-photo-cont">
                            <img src="./assets/birds/hafferiazeledoni.jpg" alt="" />
                        </div>
                        <div className="mark-info" onClick={(e) => e.preventDefault}>
                            <span className="info">
                                <p className="bold" onClick={() => console.log("hols")}>
                                    Hormiguero de Zeledón</p>
                                <p className="sci-name-style gray-text _14px">Hafferia zeledoni</p>
                                <p className="green-text _12px">99% coincidencia</p>
                                <span className="tooltip">
                                    <img src="./assets/tagging-section/vision.png" height="auto" width="30px" alt="" />
                                    <span className="tooltiptextUp">Explorar canto</span>
                                </span>
                            </span>

                            <span className="actions">
                                <span className="tooltip">
                                    <img src="./assets/Tagging/tick.png"
                                        onClick={() => tagStore.updateMark()}
                                        height="20px"
                                        width="20px" alt="" />
                                    <span className="tooltiptextUp">Validar sugerencia</span>
                                </span>
                                <span className="tooltip">
                                    <img src="./assets/tagging-section/question.svg"
                                        onClick={() => tagStore.updateMark()}
                                        height="20px"
                                        width="20px" alt="" />
                                    <span className="tooltiptextUp">Pedir opinión a la comunidad</span>
                                </span>
                                <span className="tooltip">
                                    <img src="./assets/tagging-section/cancel.png" height="20px" width="20px" alt="" />
                                    <span className="tooltiptextUp">No es esta especie</span>
                                </span>
                            </span>
                        </div>
                    </span>
                    <span className={((tagStore.selected2) ? "mark selected" : "mark") /* + ((tagStore.isSomethingSelected && !tagStore.selected2) ? " prevent-hover" : "")*/}
                        onClick={() =>
                            tagStore.selectMark("./assets/audio-samples/sipia.wav", 2)}>
                        <img src="./assets/marks/ai-mark-suggestion.svg"
                            width="17px" alt=""
                            className="mark-icon" />
                        <div className="bird-photo-cont">
                            <img src="./assets/birds/sipianigricauda.jpg" alt="" />
                        </div>
                        <div className="mark-info" onClick={(e) => e.preventDefault}>
                            <span className="info">
                                <p className="bold" onClick={() => console.log("hols")}>
                                    Hormiguero de Esmeraldas</p>
                                <p className="sci-name-style gray-text _14px">Sipia nigricauda</p>
                                <p className="green-text _12px">98% coincidencia</p>
                                <span className="tooltip">
                                    <img src="./assets/tagging-section/vision.png" height="auto" width="30px" alt="" />
                                    <span className="tooltiptextUp">Explorar canto</span>
                                </span>
                            </span>

                            <span className="actions">
                                <span className="tooltip">
                                    <img src="./assets/tagging-section/tick.png"
                                        onClick={() => tagStore.updateMark()}
                                        height="20px"
                                        width="20px" alt="" />
                                    <span className="tooltiptextUp">Validar sugerencia</span>
                                </span>
                                <span className="tooltip">
                                    <img src="./assets/tagging-section/question.svg"
                                        onClick={() => tagStore.updateMark()}
                                        height="20px"
                                        width="20px" alt="" />
                                    <span className="tooltiptextUp">Pedir opinión a la comunidad</span>
                                </span>
                                <span className="tooltip">
                                    <img src="./assets/tagging-section/cancel.png" height="20px" width="20px" alt="" />
                                    <span className="tooltiptextUp">No es esta especie</span>
                                </span>
                            </span>
                        </div>
                    </span>

                </div>
                {/*<div className="time">
                <img src="./assets/time-bar.jpg" alt="" width="949px" />
            </div>
            <div className="spectro-viz">
                <img src="./assets/Tagging/general.png" alt="" />
                    </div>*/}
            </span>
        </div>
    }
}
