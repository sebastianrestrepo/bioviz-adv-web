import React from 'react';
import { observer } from 'mobx-react';
import DashMenu from '../../DashMenu/DashMenu';
import './_ProjectOverview.scss'
import projectsStore from '../../../stores/projectsStore';
import ProjectHeader from './ProjectHeader';
import TabNavBar from './TabNavBar';
import { autorun } from 'mobx';
import authStore from '../../../stores/authStore';
interface ProjectOverviewProps {
    projectId: string,
}
@observer
class ProjectOverview extends React.Component<ProjectOverviewProps> {
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
        return <section className="project-overview">
            <DashMenu></DashMenu>
            <div className="projectOverview-layout ">
                <TabNavBar />
                {
                    (projectsStore.projectTabs[0].selected) ? <section>
                        <ProjectHeader name={projectsStore.actualProject.name} description={projectsStore.actualProject.description} />
                    </section> : (projectsStore.projectTabs[1].selected) ? <section>
                        Etiquetado
                    </section> : (projectsStore.projectTabs[2].selected) ? <section>
                        Listado
                    </section> : (projectsStore.projectTabs[3].selected) ? <section>
                        Visualización
                    </section> : (projectsStore.projectTabs[4].selected) ? <section>
                        Audios
                    </section> : ''
                }
            </div>
        </section>
    }
}

export default ProjectOverview;