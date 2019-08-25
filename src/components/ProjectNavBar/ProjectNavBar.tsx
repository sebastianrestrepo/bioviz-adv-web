import React, { Component } from 'react';
import './_ProjectNavBar.scss'
import { Link, withRouter, Redirect, Route, Router } from 'react-router-dom';

import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable, autorun } from 'mobx';

interface ProjectNavBarProps {
}

@observer class ProjectNavBar extends React.Component<ProjectNavBarProps> {

    @observable signInForm: boolean = true;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<div className="projectNavBar">
            
        </div>);
    }
}

export default observer(ProjectNavBar);