import React, { Component } from 'react';
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable } from 'mobx';
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
        authStore.checkUserStatus();
        if (authStore.statusChecked) {
            if (authStore.user === null) {
                console.log('USUARIO ES NULO', authStore.user);
                props.history.push("/");
                authStore.setStatusChecked(false);
            }
        }
    }

    render() {
        return (<div className="home">
            <DashMenu />
            <Header />
        </div>);
    }
}

export default observer(Home);