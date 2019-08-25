import React, { Component } from 'react';
import './_Home.scss'
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable, autorun } from 'mobx';
import DashMenu from '../DashMenu/DashMenu';
import Header from '../Header/Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { auth } from 'firebase';

interface HomeProps {
    history: any
}

@observer class Home extends React.Component<HomeProps> {

    @observable signInForm: boolean = true;

    constructor(props: any) {
        super(props);
        autorun(() => {
            if (!authStore.isLogged) {
                props.history.push("/");
            }
        });
    }

    render() {
        return (<div className="home">
            <DashMenu />
            <Header />
        </div>);
    }
}

export default observer(Home);