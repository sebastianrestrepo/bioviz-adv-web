import React from 'react';
import { observer } from 'mobx-react';

interface projectHeaderProps {
    name: string;
    description: string;
}

const ProjectHeader = observer(({ name, description }: projectHeaderProps) => {

    return (<section className="project-header">
        <img src="./assets/gen-icons/rocket.svg" alt="" />
        <div className="info">
            <span className="span-name">
            <h1 className="project-name">{name}</h1>
            <p className="green-text green-link bold">Cambiar nombre</p>
            </span>
            <p className="project-description">{description}</p>
        </div>
    </section>);
});

export default ProjectHeader;