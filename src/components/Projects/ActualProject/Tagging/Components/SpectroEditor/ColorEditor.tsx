import React, { Component } from 'react';
import { observer } from 'mobx-react';
import tagStore from '../../../../../../stores/taggingStore';
import './_spectroEditor.scss'
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
            <img onClick={() => tagStore.onScaleSelection('gray')} src="./assets/spectroEditor/colorscale/gray.png" alt="" />
            <p className="green-text">Seleccionado</p>
            <button className="dark-button" onClick={() => tagStore.onScaleSelection('gray')}>Seleccionar</button>
        </span>
        <span className={(tagStore.scale2Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
            <img onClick={() => tagStore.onScaleSelection('2')} src="./assets/spectroEditor/colorscale/2.png" alt="" />
            <p className="green-text">Seleccionado</p>
            <button className="dark-button" onClick={() => tagStore.onScaleSelection('2')}>Seleccionar</button>
        </span>
        <span className={(tagStore.scale3Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
            <img onClick={() => tagStore.onScaleSelection('3')} src="./assets/spectroEditor/colorscale/3.png" alt="" />
            <p className="green-text">Seleccionado</p>
            <button className="dark-button" onClick={() => tagStore.onScaleSelection('3')}>Seleccionar</button>
        </span>
        <span className={(tagStore.scale4Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
            <img onClick={() => tagStore.onScaleSelection('4')} src="./assets/spectroEditor/colorscale/4.png" alt="" />
            <p className="green-text">Seleccionado</p>
            <button className="dark-button" onClick={() => tagStore.onScaleSelection('4')}>Seleccionar</button>
        </span>
        <span className={(tagStore.scale5Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
            <img onClick={() => tagStore.onScaleSelection('5')} src="./assets/spectroEditor/colorscale/5.png" alt="" />
            <p className="green-text">Seleccionado</p>
            <button className="dark-button" onClick={() => tagStore.onScaleSelection('5')}>Seleccionar</button>
        </span>
        <span className={(tagStore.scale6Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
            <img onClick={() => tagStore.onScaleSelection('6')} src="./assets/spectroEditor/colorscale/6.png" alt="" />
            <p className="green-text">Seleccionado</p>
            <button className="dark-button" onClick={() => tagStore.onScaleSelection('6')}>Seleccionar</button>
        </span>
        <span className={(tagStore.scale7Selected) ? "color-scale-option selected" : "color-scale-option unselected"}>
            <img onClick={() => tagStore.onScaleSelection('7')} src="./assets/spectroEditor/colorscale/7.png" alt="" />
            <p className="green-text">Seleccionado</p>
            <button className="dark-button" onClick={() => tagStore.onScaleSelection('7')}>Seleccionar</button>
        </span>
    </span>;
    }

   
};

export default observer(ColorEditor);