import React from 'react';
import { observer } from 'mobx-react';
import DashMenu from '../../DashMenu/DashMenu';
import './_ActualProject.scss'
import projectsStore from '../../../stores/projectsStore';
import ProjectHeader from './Overview/ProjectHeader';
import TabNavBar from './TabNavBar';
import { autorun } from 'mobx';
import authStore from '../../../stores/authStore';
import { SpeciesList } from './SpeciesReport/SpeciesList';
import Tagging from '../../Tagging/Tagging';
import { CompareAudios } from '../../Tagging/Components/CompareAudios/CompareAudios';
interface ActualProjectProps {
    projectId: string,
}
@observer
class ActualProject extends React.Component<ActualProjectProps> {
    constructor(props: any) {
        super(props);
        projectsStore.retreiveOnlyProjectInfo(this.props.projectId);
        autorun(() => {
            if (!authStore.isLogged) {
                props.history.push("/login")
            }
        });
    }


    render() {
        return <section className="project-dashboard">
            <DashMenu></DashMenu>
            <div className="projectDash-layout ">
                <TabNavBar />
                {
                    (projectsStore.projectTabs[0].selected) ? <section className="dash-section">
                        <ProjectHeader name={projectsStore.actualProject.name} description={projectsStore.actualProject.description} />
                        <CompareAudios></CompareAudios>
                    </section> : (projectsStore.projectTabs[1].selected) ? <section className="dash-section">
                        <Tagging></Tagging>
                    </section> : (projectsStore.projectTabs[2].selected) ? <section className="dash-section">
                        <SpeciesList></SpeciesList>
                    </section> : (projectsStore.projectTabs[3].selected) ? <section className="dash-section">
                        Visualización
                    </section> : (projectsStore.projectTabs[4].selected) ? <section className="dash-section">
                        Audios
                    </section> : ''
                }
            </div>
        </section>
    }
}

export default ActualProject;