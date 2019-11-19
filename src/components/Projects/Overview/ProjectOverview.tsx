import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DashMenu from '../../DashMenu/DashMenu';
import MainNavBar from '../../MainNavBar/MainNavBar';
import './_ProjectOverview.scss'
import projectsStore from '../../../stores/projectsStore';
interface ProjectOverviewProps {
    projectId: string,
}
@observer
class ProjectOverview  extends React.Component<ProjectOverviewProps> {
    constructor(props: any) {
        super(props);
        projectsStore.retreiveOnlyProjectInfo(this.props.projectId);
    }


    render() {
        return <section className="project-overview">
            <DashMenu></DashMenu>
            <div className="projectOverview-layout ">
                <MainNavBar title={projectsStore.actualProject.name} />
            </div>
        </section>
    }
}

export default ProjectOverview;