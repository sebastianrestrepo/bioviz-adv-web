import React, { Component } from 'react';
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import projectsStore from '../../stores/projectsStore';
import { observable } from 'mobx';
import DashMenu from '../DashMenu/DashMenu';
import Header from '../Header/Header';
import AudioDropzone from './Projects';
import NewProjectCard from './NewProjectCard';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface ProjectsProps {
    history: any
}

@observer class Projects extends React.Component<ProjectsProps> {

    @observable signInForm: boolean = true;
    @observable newProjectName: any = "";
    @observable showNewProjectForm: boolean = false;

    constructor(props: any) {
        super(props);
        if (!authStore.isLogged) {
            props.history.push("/");
        }
    }

    renderProjects = () => {
        return projectsStore.projects.map(project => (<div className="project">
            <h4 className="project-name">{project.projectName}</h4>
            <p className="project-date">{project.creationDate}</p>
        </div>))
    }

    render() {
        return (<div className="projects">
            <DashMenu />
            <div className="projects-layout">
                <Header />
                <div className="projects-div" style={{
                    alignItems: (projectsStore.projects.length > 0)
                        ? 'flex-start'
                        : 'center',
                    alignContent: (projectsStore.projects.length > 0)
                        ? 'flex-start'
                        : 'center',
                    justifyContent: (projectsStore.projects.length > 0)
                        ? 'flex-start'
                        : 'center'
                }}>
                    {(this.showNewProjectForm)
                        ? <div className="create-project-div">
                            <form className="create-project-form" onSubmit={
                                (e: any) => {
                                    e.preventDefault();
                                    projectsStore.addProjectToDB(this.newProjectName, authStore.currentUsername, authStore.currentEmail);
                                    this.showNewProjectForm = false;
                                }}>
                                <h1>NUEVO PROYECTO</h1>
                                <input className="new-project-input" type="text" id="name" name="name" onChange={(e: any) => {
                                    this.newProjectName = e.target.value;
                                    projectsStore.projectName = e.target.value;
                                }} />
                                <NewProjectCard />
                                <div className="new-project-btns">
                                    <button className="cancel-btn" onClick={() => {
                                        this.showNewProjectForm = false;
                                        console.log('AUDIO FILE STATE', projectsStore.audioFileUploaded);
                                    }}>
                                        Cancelar
                                    </button>
                                    <button className="create-project-btn"
                                        type="submit"
                                        value="Crear" disabled={
                                            !projectsStore.audioFileUploaded
                                        }>Crear</button>
                                </div>
                            </form>
                        </div>
                        : ''}
                    {(projectsStore.projects.length > 0)
                        ? <div className="projects-view">
                            {this.renderProjects()}
                        </div>
                        : <div className="no-projects-view">
                            <img src="./assets/birds-illustration.png" alt="" width="220" />
                            <h3>¡Bienvenido a BioViz, Sebastián!</h3>
                            <p>Aquí aparecerán tus proyectos para que puedas gestionarlos. <br></br> Crea carpertas y organiza.</p>
                            <button onClick={() => {
                                this.showNewProjectForm = true;
                            }}>Crea un nuevo proyecto</button>
                        </div>}
                </div>
                <button className="add-project-float-btn"
                    onClick={() => {
                        this.showNewProjectForm = true;
                    }}>
                    <img src="./assets/add-icon.png" alt="" width="40" />
                </button>
            </div>

        </div>);
    }
}

export default observer(Projects);