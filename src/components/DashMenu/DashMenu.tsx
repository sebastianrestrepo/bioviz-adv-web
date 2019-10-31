import * as React from 'react';
import './_DashMenu.scss';
import { Link, withRouter, Redirect, Route, Router } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Component } from 'react';
import genStore from '../../stores/genStore';


@observer class DashMenu extends Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<section className={(genStore.isDashOpen) ? "dash-menu open" : "dash-menu closed"}>
            <div className="logo">
                <p>Bioviz</p>
                <img onClick={() => genStore.openDash()} src="./assets/dashmenu-icons/expand-dash.svg" alt="" />
            </div>

            <div className="dash-icon" id="home-icon">
                <span id="home-btn"  className={(genStore.isHomeActive) ? 'selected' : ''}
                    onClick={() => {
                        genStore.onDahshNavClick('home')

                    }}>
                    <img src="./assets/dashmenu-icons/home-button.svg" alt="" />
                    <h4>Inicio</h4>
                </span>
                {genStore.isHomeActive
                    ? <Redirect to='/home' />
                    : genStore.isProjectsActive ? <Redirect to='/projects' />
                    : ''
                }
            </div>

            <div className="dash-icon" id="analysis-icon">
                <span id="analysis-btn" className={(genStore.isProjectsActive) ? 'selected' : ''}
                    onClick={() => {
                        genStore.onDahshNavClick('projects')
                    }}>
                    <img src="./assets/dashmenu-icons/projects-button.svg" alt="" />
                    <h4>Proyectos</h4>
                </span>
            </div>
        </section>);
    }
}

export default DashMenu;