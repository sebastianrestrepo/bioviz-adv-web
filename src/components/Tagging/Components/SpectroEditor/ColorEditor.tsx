import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './_spectroEditor.scss'
import tagStore from '../../../../stores/taggingStore';
import toolsStore from '../../../../stores/toolsStore';
interface colorEditorProps {

}

class ColorEditor extends Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return <span className="color-atom">
            <div className="edit-header">
                <h3>Edición de color</h3>
                <img src="./assets/dark-x-close.svg" className="close" height="15px" alt="" />
            </div>
            <p>Escoge una escala de color para visualizar la energía del sonido.</p>
            <span className={(tagStore.scale1Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
                <img onClick={() => {
                    tagStore.onScaleSelection('gray');
                    toolsStore.changeSpectrogramColor(0);
                }} src="./assets/spectroEditor/colorscale/gray.png" alt="" />
            </span>
            <span className={(tagStore.scale2Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
                <img onClick={() => {
                    tagStore.onScaleSelection('2');
                    toolsStore.changeSpectrogramColor(1);
                }} src="./assets/spectroEditor/colorscale/2.png" alt="" />
            </span>
            <span className={(tagStore.scale3Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
                <img onClick={() => {
                    tagStore.onScaleSelection('3');
                    toolsStore.changeSpectrogramColor(2);
                }} src="./assets/spectroEditor/colorscale/3.png" alt="" />
            </span>
            <span className={(tagStore.scale4Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
                <img onClick={() => {
                    tagStore.onScaleSelection('4');
                    toolsStore.changeSpectrogramColor(3);
                }} src="./assets/spectroEditor/colorscale/4.png" alt="" />
            </span>
            <span className={(tagStore.scale5Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
                <img onClick={() => {
                    tagStore.onScaleSelection('5');
                    toolsStore.changeSpectrogramColor(4);
                }} src="./assets/spectroEditor/colorscale/5.png" alt="" />
            </span>
            <span className={(tagStore.scale6Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
                <img onClick={() => {
                    tagStore.onScaleSelection('6');
                    toolsStore.changeSpectrogramColor(5);
                }} src="./assets/spectroEditor/colorscale/6.png" alt="" />
            </span>
            <span className={(tagStore.scale7Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
                <img onClick={() => {
                    tagStore.onScaleSelection('7');
                    toolsStore.changeSpectrogramColor(6);
                }} src="./assets/spectroEditor/colorscale/7.png" alt="" />
            </span>
        </span>;
    }


};

export default observer(ColorEditor);