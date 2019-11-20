import React, { Component } from 'react';
import './_Home.scss'
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable, autorun } from 'mobx';
import DashMenu from '../DashMenu/DashMenu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { auth } from 'firebase';
import genStore from '../../stores/genStore';
import MainNavBar from '../MainNavBar/MainNavBar';
import SpectroComp from '../Tagging/SpectroComp';
import ToolsMenu from '../Tagging/ToolsMenu/ToolsMenu';

interface HomeProps {
    history: any
}

@observer class Home extends React.Component<HomeProps> {

    @observable signInForm: boolean = true;

    constructor(props: any) {
        super(props);
        autorun(() => {
            (authStore.isLogged) ?
                props.history.push("/")
                : props.history.push("/login")
        });

    }

    render() {
        return (<div className="home">
            <DashMenu />
            <div className="page-layout">
                <MainNavBar title={genStore.navBarTitle} />
                <SpectroComp />
                <ToolsMenu />
            </div>
        </div>);
    }
}

export default observer(Home);