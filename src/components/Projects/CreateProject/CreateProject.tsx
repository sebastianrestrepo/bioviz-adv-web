import React, { Component } from 'react';
import Select from 'react-select'
import projectsStore from '../../../stores/projectsStore';
import { observer } from 'mobx-react';
import AudioDropzone from '../AudioDropzone';
import reportStore from '../../../stores/reportStore';

const options = [
    { value: 'diana', label: 'diana@icesi.edu.co' },
    { value: 'strawberry', label: 'caarce@icesi.edu.co' },
    { value: 'vanilla', label: 'gustavo@icesi.edu.co' }
]

class CreateProject extends Component {
    handleSpecieChange = (newValue: any, actionMeta: any) => {

        let action = actionMeta.action;
        if (action == 'select-option') {
            projectsStore.onAddSpecieStudy(newValue.value)
            newValue.value = ''
            projectsStore.defaultSpecieStudy = newValue.value
        }
    };
    handleSpecieInputChange = (inputValue: any, actionMeta: any) => {
        //console.group('Input Changed');
        //console.log(inputValue);
        //console.log(`action: ${actionMeta.action}`);
        //console.groupEnd();

    };
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
                    (projectsStore.creationStep === 1) ? <section className="details firstdisplay">
                        <form className="content" >
                            <span className="question-structure">
                                <label className="green-subtitle">Nombre del proyecto</label>
                                <input placeholder="Escribe el nombre del proyecto"
                                    onChange={(e: any) => {
                                        projectsStore.newProject.name = e.target.value;
                                    }}
                                    value={projectsStore.newProject.name}
                                    type="text" />
                            </span>
                            <br />
                            <span className="question-structure">
                                <label className="green-subtitle">Descripción del proyecto</label>
                                <textarea placeholder="Resume tu proyecto en unas cuantas palabras..."
                                    onChange={(e: any) => {
                                        projectsStore.newProject.description = e.target.value;
                                    }}
                                    value={projectsStore.newProject.description}
                                    name="" id=""></textarea>
                            </span>
                            <br />
                            <span className="question-structure">
                                <label className="green-subtitle">Colegas</label>
                                <Select
                                    isMulti
                                    name="colors"
                                    placeholder="Busca colegas por su correo electrónico"
                                    options={projectsStore.bioUsers}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </span>
                        </form>
                    </section> : (projectsStore.creationStep === 2) ? <section id="objective" className="firstdisplay">
                        <div className="location-cont">
                            <form className="content" >
                                <span className="question-structure">
                                    <label className="green-subtitle">Zona de localización</label>
                                    <input placeholder="Ingresa una dirección o coordenadas" value="Anchicayá La Loca, Valle del Cauca, Colombia" type="text" />
                                </span>
                                <div className="map">
                                    <img src="./assets/create-projects/map.png" alt=""/>
                                </div>
                            </form>
                        </div>
                        <div className="species-cont">
                            <span className="question-structure">
                                <label className="green-subtitle">Especies a estudiar</label>
                                <Select className={'react-selector'}
                                    isClearable
                                    defaultValue={projectsStore.defaultSpecieStudy}
                                    onChange={this.handleSpecieChange}
                                    onInputChange={this.handleSpecieInputChange}
                                    options={reportStore.scinamesOptions}
                                    placeholder={'Escribe la especie a estudiar'}
                                    isSearchable />
                            </span>
                            <p className="green-link">Agregar las especies usuales de la zona de estudio</p>
                            <div className="species-list-cont">
                                {
                                    projectsStore.studyingSpecies.map((e, i) => {
                                        return <div className="specie-selected-row">
                                            <div className="photo-cont">
                                                <img src={e.photo} alt="" />
                                            </div>
                                            <span className="specie-text">
                                                <p className="bold">{e.commonName}</p>
                                                <p className="sci-name-style gray-text">{e.sciName}</p>
                                            </span>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </section> : (projectsStore.creationStep === 3) ? <section id="data-collection" className="firstdisplay">
                        <div className="method-cont">
                            <span className="question-structure">
                                <label className="green-subtitle">Modos de recolección</label>
                                <br />
                                <span className="checks-cont">
                                    <label className="check-container">
                                        <input type="checkbox" />
                                        Por intervalos
                                    <span className="checkmark"></span>
                                    </label>
                                    <label className="check-container">
                                        <input type="checkbox" />
                                        Continua
                                    <span className="checkmark"></span>
                                    </label>
                                </span>
                            </span>
                            <span className="row-question-structure">
                                <label > Duración en minutos
                                </label>
                                <input placeholder="0 min"
                                    onChange={(e: any) => {
                                        projectsStore.newProject.audioDuration = e.target.value;
                                    }}
                                    type="number" />


                            </span>
                            <span className="row-question-structure">
                                <label > Frecuencia en el día
                                </label>
                                <input placeholder="0" value={projectsStore.newProject.frequency}
                                    onChange={(e: any) => {
                                        projectsStore.newProject.frequency = e.target.value;
                                    }}
                                    type="number" />

                            </span>

                            <span className="question-structure step3">
                                <label className="green-subtitle">Tipo de micrófono utilizado</label>
                                <Select
                                    placeholder="Escoger dispositivo"
                                    options={projectsStore.monitoringSystems} />
                            </span>
                            <span className="question-structure step3">
                                <label className="green-subtitle">Distribución de micrófonos de MONAC utilizada</label>
                                <Select
                                    placeholder="Escoger distribución"
                                    options={projectsStore.monacDistribution} />
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