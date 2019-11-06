import React, { Component } from 'react';
import Select from 'react-select'
import projectsStore from '../../../stores/projectsStore';
import { observer } from 'mobx-react';
import AudioDropzone from '../AudioDropzone';

const options = [
    { value: 'diana', label: 'diana@icesi.edu.co' },
    { value: 'strawberry', label: 'caarce@icesi.edu.co' },
    { value: 'vanilla', label: 'gustavo@icesi.edu.co' }
]

class CreateProject extends Component {

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="create-project">
                <span className="title-row">
                    <img onClick={() => projectsStore.onStepBackClick()} src="./assets/gen-icons/back-arrow.svg" width="27px" alt="" />
                    <h1 >{projectsStore.stepTitle}</h1>
                    <img onClick={() => projectsStore.onCancelProjectCreation()} src="./assets/gen-icons/close-x.svg" width="21px" alt="" />
                </span>
                {
                    (projectsStore.creationStep == 1) ? <section className="details">
                        <form className="content" >
                            <span className="question-structure">
                                <label className="green-subtitle">Nombre del proyecto</label>
                                <input placeholder="Escribe el nombre del proyecto" type="text" />
                            </span>
                            <br />
                            <span className="question-structure">
                                <label className="green-subtitle">Descripción del proyecto</label>
                                <textarea placeholder="Resume tu proyecto en unas cuantas palabras..." name="" id=""></textarea>
                            </span>
                            <br />
                            <span className="question-structure">
                                <label className="green-subtitle">Colegas</label>
                                <Select
                                    isMulti
                                    name="colors"
                                    placeholder="Busca colegas por su correo electrónico"
                                    options={options}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </span>
                        </form>
                    </section> : (projectsStore.creationStep == 2) ? <section id="objective">
                        <div className="location-cont">
                            <form className="content" >
                                <span className="question-structure">
                                    <label className="green-subtitle">Zona de localización</label>
                                    <input placeholder="Ingresa una dirección o coordenadas" type="text" />
                                </span>
                                <div className="map">

                                </div>
                            </form>
                        </div>
                        <div className="species-cont">
                            <span className="question-structure">
                                <label className="green-subtitle">Especies a estudiar</label>
                                <input placeholder="Por nombre científico o común" type="text" />
                            </span>
                            <p className="green-link">Agregar las especies usuales de la zona de estudio</p>
                            <div className="species-list-cont">

                            </div>
                        </div>
                    </section> : (projectsStore.creationStep == 3) ? <section id="data-collection">
                        <div className="method-cont">
                            <span className="question-structure">
                                <label className="green-subtitle">Modos de recolección</label>
                                <input placeholder="Por nombre científico o común" type="text" />
                            </span>
                            <span className="question-structure">
                                <label className="green-subtitle">Tipo de micrófono utilizado</label>
                                <input placeholder="Por nombre científico o común" type="text" />
                            </span>
                            <span className="question-structure">
                                <label className="green-subtitle">Estructura de MONAC utilizada</label>
                                <input placeholder="seleccionar" type="text" />
                            </span>
                            
                        </div>
                        <div className="audio-cont">
                            <label className="green-subtitle">Audios recolectados</label>
                            <AudioDropzone></AudioDropzone>
                        </div>
                    </section> : ''
                }

                <button id="nextBtn" className="mainBtn"
                    onClick={() => projectsStore.onNextStepClick()}
                >Siguiente</button>
            </div>
        );
    }

}

export default observer(CreateProject);