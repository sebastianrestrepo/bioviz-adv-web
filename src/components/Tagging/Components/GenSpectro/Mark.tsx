import * as React from 'react';
import './_AIGenSuggestions.scss';
import { observer } from 'mobx-react';
import tagStore from '../../../../stores/taggingStore';
import { suggestionStore } from '../../../../stores/suggestionStore';
import { Component } from 'react';

interface markProps {
    start: any,
    end: any,
    suggestion: any,
}

class Mark extends Component<markProps> {
    sugData = JSON.parse(this.props.suggestion);
    constructor(props: any) {
        super(props);
    }
    render() {
        return <div className="marks">
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

        </div>
    }
}
export default observer(Mark);