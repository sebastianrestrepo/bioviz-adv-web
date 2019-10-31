import React, { Component } from 'react';
import './_MainNavBar.scss'
import { Link, withRouter, Redirect, Route, Router } from 'react-router-dom';

import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable, autorun } from 'mobx';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

interface MainNavBarProps {
    title: string
}

@observer class MainNavBar extends React.Component<MainNavBarProps> {

    @observable signInForm: boolean = true;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<div className="mainNavBar">
            <h3>{this.props.title}</h3>
            <ProfileMenu />
        </div>);
    }
}

export default observer(MainNavBar);