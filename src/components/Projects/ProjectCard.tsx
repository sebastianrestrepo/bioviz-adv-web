import React, { Component } from 'react';
import { observer } from 'mobx-react';
import genStore from '../../stores/genStore';

interface projectCardProps {
    name: string;
    date: string;
}

const ProjectCard = observer(({ name, date }: projectCardProps) => {

    return (<div className="project-card"  onClick={() => {
        genStore.onDahshNavClick('actualproject')
    }}>
        <h4 className="project-name">{name}</h4>
        <img src="./assets/gen-icons/rocket.svg" alt=""/>
        <p className="project-date">{date}</p>
    </div>);
});

export default ProjectCard;