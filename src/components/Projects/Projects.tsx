import React, { Component } from 'react';
import './_Projects.scss'
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import projectsStore from '../../stores/projectsStore';
import { observable, autorun } from 'mobx';
import DashMenu from '../DashMenu/DashMenu';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateProject from './CreateProject/CreateProject';
import MainNavBar from '../MainNavBar/MainNavBar';
import TopBar from './TopBar';
import ProjectCard from './ProjectCard';
import genStore from '../../stores/genStore';

interface ProjectsProps {
    history: any
}

@observer class Projects extends React.Component<ProjectsProps> {

    @observable signInForm: boolean = true;
    @observable newProjectName: any = "";

    constructor(props: any) {
        super(props);
        autorun(() => {
            (authStore.isLogged) ?
                props.history.push("/projects")
                : props.history.push("/")
        });
    }

    renderProjects = () => {
        return projectsStore.projects.map(project =>
            (
                <Link to={`/projects/${project.id}`} key={project.id}
                    onClick={() => projectsStore.openProjectTab(0)}>
                    <ProjectCard name={project.name} date={project.date} ></ProjectCard>
                </Link>
            ))
    }

    render() {

        return (<div className="projects ">
            <DashMenu />
            <div className="projects-layout ">
                <MainNavBar title={genStore.navBarTitle} />
                <TopBar />
                <div className="projects-div firstdisplay" style={{
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
                    {(projectsStore.showNewProjectForm)
                        ? <div className="create-project-div">
                            <CreateProject></CreateProject>
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
                                projectsStore.onCreateProject()
                            }}>Crea un nuevo proyecto</button>
                        </div>}
                </div>
            </div>

        </div>);
    }
}

export default observer(Projects);