import React, { Component } from 'react';
import './_Tagging.scss'
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable, autorun } from 'mobx';
import DashMenu from '../DashMenu/DashMenu';
import ProjectNavBar from '../ProjectNavBar/ProjectNavBar';

interface TaggingProps {
    history: any
}

@observer class Tagging extends React.Component<TaggingProps> {

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
        return (<div className="tagging">
            <DashMenu />
            <ProjectNavBar/>
        </div>);
    }
}

export default observer(Tagging);