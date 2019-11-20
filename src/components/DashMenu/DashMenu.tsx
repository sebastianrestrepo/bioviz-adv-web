import * as React from 'react';
import './_DashMenu.scss';
import { Link, withRouter, Redirect, Route, Router } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Component } from 'react';
import genStore from '../../stores/genStore';
import projectsStore from '../../stores/projectsStore';


@observer class DashMenu extends Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<section className={(genStore.isDashOpen) ? "dash-menu open" : "dash-menu closed"}>
            <div className="logo">
                <img className="logo-file" src="./assets/general/logo-horizontal.svg" alt="" />
                <img className="ham-icon" onClick={() => genStore.openDash()} src="./assets/dashmenu-icons/expand-dash.svg" alt="" />
            </div>
            <Link to="/" className="dash-icon-link">
                <div className="dash-icon" id="home-icon">
                    <span id="home-btn" className={(genStore.isHomeActive) ? 'selected' : ''}
                        onClick={() => {
                            genStore.onDahshNavClick('home')
                        }}>
                        <img src="./assets/dashmenu-icons/home-button.svg" alt="" />
                        <h4>Inicio</h4>
                    </span>

                </div>
            </Link>
            <Link to="/projects" className="dash-icon-link">
                <div className="dash-icon" id="analysis-icon">
                    <span id="analysis-btn" className={(genStore.isProjectsActive) ? 'selected' : ''}
                        onClick={() => {
                            genStore.onDahshNavClick('projects')
                        }}>
                        <img src="./assets/dashmenu-icons/projects-button.svg" alt="" />
                        <h4>Proyectos</h4>
                    </span>
                </div>
            </Link>
            <div className="dash-icon" id="notifications-icon">
                <span id="notifications-btn" className={(genStore.isNotificationsActive) ? 'selected' : ''}>
                    <img src="./assets/dashmenu-icons/notifications.svg" alt="" />
                    <h4>Notificaciones</h4>
                </span>
            </div>
            <div className="dash-icon" id="lists-icon">
                <span id="lists-btn" className={(genStore.isListsActive) ? 'selected' : ''}>
                    <img src="./assets/dashmenu-icons/lists.svg" alt="" />
                    <h4>Listados</h4>
                </span>
            </div>
            {
                (projectsStore.actualProject.name != null) ? <div className="firstdisplay project-nav">
                    <span className="p-wrapper">
                        <p className="p-project">{(genStore.isDashOpen) ? "Trabajando en: " : "En:"}</p>
                    </span>
                    <Link to={`/projects/${projectsStore.actualProject.id}`} className="dash-icon-link">
                        <div className="dash-icon" id="actualProject-icon"
                            onClick={() => {
                                genStore.onDahshNavClick('actualproject')
                                projectsStore.openProjectTab(0)
                            }}
                        >
                            <span id="actualProject-btn" className={(genStore.isActualProjectActive) ? 'selected' : ''}>
                                <img className="color-icon" src="./assets/gen-icons/rocket.svg" alt="" />
                                <h4>{projectsStore.actualProject.name}</h4>
                            </span>
                        </div>
                    </Link>
                    {
                        (genStore.isDashOpen) ? <section>
                            <div className="dash-icon project-section-handler"
                                onClick={() => {
                                    genStore.onDahshNavClick('actualproject')
                                    projectsStore.openProjectTab(0)
                                }}>
                                <span className={(genStore.isActualProjectActive) ? 'selected project-section-btn' : 'project-section-btn'}>
                                    <div className={(projectsStore.projectTabs[0].open) ? 'dot tab-open' : 'dot'}></div>
                                    <h4>Vista general</h4>
                                </span>
                            </div>

                            <div className="dash-icon project-section-handler"
                                onClick={() => {
                                    genStore.onDahshNavClick('actualproject')
                                  projectsStore.openProjectTab(1)
                                }}>
                                <span className={(genStore.isActualProjectActive) ? 'selected project-section-btn' : 'project-section-btn'}>
                                    <div className={(projectsStore.projectTabs[1].open) ? 'dot tab-open' : 'dot'}></div>
                                    <h4>Etiquetado</h4>
                                </span>
                            </div>
                            <div className="dash-icon project-section-handler"
                                onClick={() => {
                                    genStore.onDahshNavClick('actualproject')
                                    projectsStore.openProjectTab(3)
                                }}>
                                <span className={(genStore.isActualProjectActive) ? 'selected project-section-btn' : 'project-section-btn'}>
                                    <div className={(projectsStore.projectTabs[3].open) ? 'dot tab-open' : 'dot'}></div>
                                    <h4>Visualización</h4>
                                </span>
                            </div>
                            <div className="dash-icon project-section-handler"
                                onClick={() => {
                                    genStore.onDahshNavClick('actualproject')
                                    projectsStore.openProjectTab(2)

                                }}>
                                <span className={(genStore.isActualProjectActive) ? 'selected project-section-btn' : 'project-section-btn'}>
                                    <div className={(projectsStore.projectTabs[2].open) ? 'dot tab-open' : 'dot'}></div>
                                    <h4>Listado</h4>
                                </span>
                            </div>
                            <div className="dash-icon project-section-handler"
                                onClick={() => {
                                    genStore.onDahshNavClick('actualproject')
                                    projectsStore.openProjectTab(4)

                                }}>
                                <span className={(genStore.isActualProjectActive) ? 'selected project-section-btn' : 'project-section-btn'}>
                                    <div className={(projectsStore.projectTabs[4].open) ? 'dot tab-open' : 'dot'}></div>
                                    <h4>Audios subidos</h4>
                                </span>
                            </div>
                        </section> : ''
                    }

                </div> : ''
            }
            <div>

            </div>
        </section>);
    }
}

export default DashMenu;