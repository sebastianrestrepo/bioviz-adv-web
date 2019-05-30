import React, { Component } from 'react';
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable } from 'mobx';
import DashMenu from '../DashMenu/DashMenu';
import Header from '../Header/Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface ChatProps {
    history: any
}

@observer class Chat extends React.Component<ChatProps> {

    @observable signInForm: boolean = true;

    constructor(props: any) {
        super(props);
        if (!authStore.isLogged) {
            props.history.push("/");
        }
    }

    render() {
        return (<div className="chat">
            <DashMenu />
            <Header />
        </div>);
    }
}

export default observer(Chat);