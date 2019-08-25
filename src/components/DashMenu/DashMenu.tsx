import * as React from 'react';
import './_DashMenu.scss';
import { Link, withRouter, Redirect, Route, Router } from 'react-router-dom';
import authStore from '../../stores/authStore';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Component } from 'react';


@observer class DashMenu extends Component {

    @observable homeBtnSelected: boolean = false;
    @observable projectBtnSelected: boolean = false;
    @observable chatBtnSelected: boolean = false;


    @observable homeBtnOver: boolean = false;
    @observable projectBtnOver: boolean = false;
    @observable chatBtnOver: boolean = false;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<section className="dash-menu closed">
            <div className="logo">BioViz</div>

            <div className="dash-icon" id="home-icon">
                <button id="home-btn"
                    onClick={() => {
                        this.homeBtnSelected = true;
                        this.projectBtnSelected = false;
                        this.chatBtnSelected = false;
                    }}
                    onMouseOver={() => {
                        this.homeBtnOver = true;
                        this.projectBtnOver = false;
                        this.chatBtnOver = false;
                    }}
                    onMouseOut={() => {
                        this.homeBtnOver = false;
                        this.projectBtnOver = false;
                        this.chatBtnOver = false;
                    }}
                    style={{
                        backgroundColor: this.homeBtnSelected
                            ? '#35E285'
                            : this.homeBtnOver ? '#4F4F4F' : '#272E2E'
                    }}>
                    <img src="./assets/dashmenu-icons/home-button.svg" alt=""/>
                    <h4>Inicio</h4>
                </button>
                {this.homeBtnSelected
                    ? <Redirect to='/home' />
                    : this.projectBtnSelected ? <Redirect to='/projects' />
                    : this.chatBtnSelected ? <Redirect to='/chat' /> :''
                }
            </div>

            <div className="dash-icon" id="analysis-icon">
                <button id="analysis-btn"
                    onClick={() => {
                        this.homeBtnSelected = false;
                        this.projectBtnSelected = true;
                        this.chatBtnSelected = false;
                    }}
                    onMouseOver={() => {
                        this.homeBtnOver = false;
                        this.projectBtnOver = true;
                        this.chatBtnOver = false;
                    }}
                    onMouseOut={() => {
                        this.homeBtnOver = false;
                        this.projectBtnOver = false;
                        this.chatBtnOver = false;
                    }}
                    style={{
                        backgroundColor: this.projectBtnSelected
                        ? '#35E285'
                        : this.projectBtnOver ? '#4F4F4F' : '#272E2E'
                    }}>
                    <img src="./assets/dashmenu-icons/projects-button.svg" alt=""/>
                    <h4>Proyectos</h4>
                </button>
            </div>
        </section>);
    }
}

export default DashMenu;