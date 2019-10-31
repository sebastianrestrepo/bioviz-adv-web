import React, { Component } from 'react';
import Select from 'react-select'
import projectsStore from '../../stores/projectsStore';
import { observer } from 'mobx-react';

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
                    </section> : (projectsStore.creationStep == 2) ? <section>hola</section> : ''
                }

                <button id="nextBtn" className="mainBtn"
                    onClick={() => projectsStore.onNextStepClick()}
                >Siguiente</button>
            </div>
        );
    }

}

export default observer(CreateProject);