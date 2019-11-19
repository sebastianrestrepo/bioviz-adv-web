import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DashMenu from '../../DashMenu/DashMenu';
import MainNavBar from '../../MainNavBar/MainNavBar';
import genStore from '../../../stores/genStore';
import { autorun } from 'mobx';
import authStore from '../../../stores/authStore';

interface ProjectOverviewProps {
    history: any,
    projectId: ''
}
class ProjectOverview extends Component {

    constructor(props: any) {
        super(props);
 
    }

    render() {
        return <section>
            Hola
        </section>
    }
}

export default observer(ProjectOverview);