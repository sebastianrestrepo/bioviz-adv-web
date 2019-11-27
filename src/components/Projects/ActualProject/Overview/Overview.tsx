import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './_overview.scss'
import projectsStore from '../../../../stores/projectsStore';
import reportStore from '../../../../stores/reportStore';
import genStore from '../../../../stores/genStore';

class Overview extends Component {

    constructor(props: {}) {
        super(props);
    }

    render() {
        return <section className="overview-cont">
            <div className="overview-cols left">
                <div className="progress">
                    <h1>Progreso del proyecto</h1>
                    <span className="stat">
                        <h1>{reportStore.speciesList.length}</h1>
                        <p>Especies en la lista</p>
                    </span>
                </div>
                <div className="tag">
                    <p>Continuar analizando y etiquetando datos:</p>
                    <button className="green-button"
                        onClick={() => {
                            projectsStore.openProjectTab(1)
                            genStore.isDashOpen = false;
                        }}
                    >Ir a sección de etiquetado</button>
                </div>

            </div>
            <div className="overview-cols right">
                <div className="location">
                    <h1>Zona de estudio</h1>
                    <h3>{projectsStore.actualProject.location}</h3>
                    <p>3.328861, -76.640196</p>
                    <img src="./assets/create-projects/map.png" alt="" />
                </div>
                <div className="species">
                    <h1>Especies en estudio</h1>
                    <p>Hay {projectsStore.actualStudyingSpecies.length} como objetivo de estudio en este proyecto.</p>
                    <div className="cont" >
                        {
                            projectsStore.actualStudyingSpecies.map((e, i) => {
                                return <span className="tooltip">
                                    <div className="bird-photo">
                                        <img src={e.photo} alt="" />
                                    </div>
                                    <span className="tooltiptext">{e.sciName}</span>
                                </span>
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    }
}

export default observer(Overview);