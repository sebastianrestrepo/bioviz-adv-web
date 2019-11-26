import * as React from 'react';
import './SpectrogramCompareView.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import SpectroChanel from './SpectroChanel';
import toolsStore from '../../../../../stores/toolsStore';

interface SpectroProps {
    name: string;
    spectroNum: string;
    volume: number;
    audioUrl: string
}

@observer
export class SpectrogramCompareView extends React.Component<SpectroProps, any>  {
    @observable volVal = 1;
    tempWsRef: any;
    retrieveWSRef() {
        switch (this.props.spectroNum) {
            case '1':
                this.tempWsRef = toolsStore.wsSelectionRef;
                break;
            case '2':
                this.tempWsRef = toolsStore.wsM2Ref;
                break;
            case '3':
                this.tempWsRef = toolsStore.wsM3Ref;
                break;
            case '4':
                this.tempWsRef = toolsStore.wsM4Ref;
                break;
            case '5':
                this.tempWsRef = toolsStore.wsM5Ref;
                break;
            case '6':
                this.tempWsRef = toolsStore.wsM6Ref;
                break;
        }
    }
    constructor(props: SpectroProps) {
        super(props);
        (toolsStore.regionStart != null) ?
            toolsStore.loadSpectroSel(toolsStore.regionStart * 1000, toolsStore.regionEnd * 1000,
                this.props.audioUrl, this.props.spectroNum) : console.log()

    }

    onVolChange(value) {
        console.log(value)
        this.volVal = value;
        document.getElementById('spectro')
    };
    onVolInputChange(value) {
        console.log(value)
        this.volVal = parseFloat(value);
    }
    onVolAfterChange = (value) => {
        console.log(value);
    };

    render() {
        return <div className="spectro-atom firstdisplay">
            <div className="actions">
                <span className="title">
                    <img src="" alt="" />
                    <p>{this.props.name}</p>
                </span>
                <img src="./assets/pinned.svg" height="20px" alt="" />
                <br />
                <div className="slidecontainer">
                    <Slider
                        defaultValue={1}
                        value={this.volVal}
                        onChange={(e) => this.onVolChange(e)}
                        min={0}
                        max={1}
                        step={0.1}
                        trackStyle={{ backgroundColor: '#AFEA7D', height: 4 }}
                        handleStyle={{
                            borderColor: '#fff',
                            height: 18,
                            width: 18,
                            marginLeft: -10,
                            marginTop: -7,
                            backgroundColor: '#3BC57F',
                        }}
                        railStyle={{ backgroundColor: '#C4C4C4', height: 4 }}
                    />
                </div>
                <br />
                <img src="./assets/volumeon.svg" className="volume" height="17px" alt="" />
            </div>
            <div className="spectro-viz">
                <SpectroChanel microNum={this.props.spectroNum}></SpectroChanel>
            </div>
        </div>
    }
}