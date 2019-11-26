import * as React from 'react';
import './ToolsMenu.scss'
import { observer } from 'mobx-react';
import toolsStore from '../../../../stores/toolsStore';
import tagStore from '../../../../stores/taggingStore';

@observer
export default class ToolsMenu extends React.Component {

    render() {
        return <div className="tool-bar">
            <div className="audio-options">
                {(toolsStore.isPlaying)
                    ? <span className="tooltip">
                        <button className="tool-btn" onClick={() => {
                            toolsStore.handlePlayPause();
                            toolsStore.isPlaying = !toolsStore.isPlaying;
                        }}><img src="./assets/tool-bar-assets/pause-icon.svg"
                            alt="" ></img></button>
                        <span className="tooltiptext">Pausar</span>
                    </span>
                    : <span className="tooltip">
                        <button className="tool-btn" onClick={() => {
                            toolsStore.handlePlayPause();
                            toolsStore.isPlaying = !toolsStore.isPlaying;
                        }}><img src="./assets/tool-bar-assets/play-icon.svg"
                            alt="" ></img></button>
                        <span className="tooltiptext">Reproducir</span>
                    </span>}
                <span className="tooltip">
                    <button className="tool-btn"><img src="./assets/tool-bar-assets/advance-icon.svg"
                        alt=""></img></button>
                    <span className="tooltiptext">Avanzar</span>
                </span>
                <span className="tooltip">
                    <button className="tool-btn"><img src="./assets/tool-bar-assets/stop-icon.svg"
                        alt=""></img></button>
                    <span className="tooltiptext">Parar</span>
                </span>
                <span className="tooltip">
                    <button className="tool-btn"><img src="./assets/tool-bar-assets/volume-icon.svg"
                        alt=""></img></button>
                    <span className="tooltiptext">Volumen</span>
                </span>
            </div>
            <div className="edition-options">
                <span className="tooltip">
                    <button className="tool-btn"><img src="./assets/tool-bar-assets/arrow-icon.svg"
                        alt=""></img></button>
                    <span className="tooltiptext">Cursor</span>
                </span>
                {/*<span className="tooltip">
                    <button className="tool-btn" onClick={toolsStore.saveRegions}><img src="./assets/tool-bar-assets/select-icon.svg"
                        alt="" ></img></button>
                    <span className="tooltiptext">Realizar una selección</span>
                </span>*/}
                <span className="tooltip">
                    <button className="tool-btn"><img src="./assets/tool-bar-assets/zoom-in-icon.svg"
                        alt="" ></img></button>
                    <span className="tooltiptext">Acercar</span>
                </span>
                <span className="tooltip">
                    <button className="tool-btn"><img src="./assets/tool-bar-assets/zoom-out-icon.svg"
                        alt="" ></img></button>
                    <span className="tooltiptext">Alejar</span>
                </span>
                <span className="tooltip">
                    <button className="tool-btn"><img src="./assets/tool-bar-assets/color-icon.svg"
                        alt="" onClick={()=>{
                          tagStore.isColorEditorOn = !tagStore.isColorEditorOn;
                          tagStore.isContrastEditorOn = false;
                        }}></img></button>
                    <span className="tooltiptext">Mapa de Color</span>
                </span>
                <span className="tooltip">
                    <button className="tool-btn"><img src="./assets/tool-bar-assets/bright-icon.svg"
                        alt="" onClick={()=>{
                            tagStore.isContrastEditorOn = !tagStore.isContrastEditorOn;
                            tagStore.isColorEditorOn = false;
                          }}></img></button>
                    <span className="tooltiptext">Brillo/Contraste</span>
                </span>
            </div>
        </div>
    }
}