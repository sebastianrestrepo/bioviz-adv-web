import * as React from 'react';
import './_AIGenSuggestions.scss';
import { observer } from 'mobx-react';
import tagStore from '../../../../stores/taggingStore';
import toolsStore from '../../../../stores/toolsStore';
import { suggestionStore } from '../../../../stores/suggestionStore';
import { Component } from 'react';

interface markProps {
    index: any,
    start: any,
    end: any,
    suggestion: any,
    isGeneralSpectro: any
}

class Mark extends Component<markProps> {
    sugData = JSON.parse(this.props.suggestion);
    constructor(props: any) {
        super(props);
    }

    render() {

        return <span className={((tagStore.selected1 && this.props.index == 1) ? "mark selected" : (tagStore.selected2 && this.props.index == 2) ? "mark selected" : "mark")}
            onClick={() => {
                tagStore.selectMark("./assets/audio-samples/vireon.wav", this.props.index);
                console.log('isGeneralSpectro?', this.props.isGeneralSpectro);
                console.log('this.props.start', this.props.start);
                console.log('toolsStore.regionStart', toolsStore.regionStart);
                console.log('toolsStore.regionEnd', toolsStore.regionEnd);
                console.log('left value', (this.props.start - toolsStore.regionStart) * (100 / (toolsStore.regionEnd - toolsStore.regionStart)));
            }}
            style={{
                left: (this.props.isGeneralSpectro)
                    ? (this.props.start) * 1.6 + '%'
                    : (((this.props.start - toolsStore.regionStart) * (100 / (toolsStore.regionEnd - toolsStore.regionStart))) + 7) + '%',
                display: (this.props.isGeneralSpectro) ? 'flex' : (this.props.start > toolsStore.regionStart && this.props.start < toolsStore.regionEnd) ? 'flex' : 'none',
            }}>
            <img src={"./assets/marks/" + ((tagStore.verified) ? "ai-mark-verified" : "ai-mark-suggestion") + ".svg"}
                width="17px" alt=""
                className="mark-icon" />
            <div className="bird-photo-cont">
                <img src={this.sugData.birdPhotoUrl} alt="" />
            </div>
            <div className="mark-info" onClick={(e) => e.preventDefault}>
                <span className="info">
                    <p className="bold" onClick={() => console.log("hols")}>
                        {this.sugData.commonName}</p>
                    <p className="sci-name-style gray-text _14px">{this.sugData.sciName}</p>
                    <p className="green-text _12px">{this.sugData.sciName + '% coincidencia'}</p>
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
    }
}
export default observer(Mark);