import React, { Component } from 'react';
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable } from 'mobx';
import DashMenu from '../DashMenu/DashMenu';
import Header from '../Header/Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface ProjectsProps {
    history: any
}

@observer class Projects extends React.Component<ProjectsProps> {

    @observable signInForm: boolean = true;

    constructor(props: any) {
        super(props);
        if (!authStore.isLogged) {
            props.history.push("/");
        }
    }

    render() {
        return (<div className="projects">
            <DashMenu />
            <div className="projects-layout">
                <Header />
                <div className="projects-div">
                    <div className="no-projects-view">
                        <img src="./assets/birds-illustration.png" alt="" width="220" />
                        <h3>¡Bienvenido a BioViz, Sebastián!</h3>
                        <p>Aquí aparecerán tus proyectos para que puedas gestionarlos. <br></br> Crea carpertas y organiza.</p>
                        <button>Crea un nuevo proyecto</button>
                    </div>
                </div>
                <button className="add-project-float-btn">
                <img src="./assets/add-icon.png" alt="" width="40" />
            </button>
            </div>

        </div>);
    }
}

export default observer(Projects);