import React from 'react';
import { observer } from 'mobx-react';
import projectsStore from '../../../stores/projectsStore';

interface tabProps {
    name: string;
    selected: boolean;
    id: number;
}

const Tab = observer(({ name, selected, id }: tabProps) => {

    return (<div className={(selected) ? 'tab open' : 'tab'}
        onClick={() => {
            projectsStore.onClickProjectTab(id)
        }}>
        <h4>{name}</h4>
        <img src="./assets/gen-icons/close-x.svg" alt="" onClick={() => {
            projectsStore.onCloseProjectTab(id)
        }} />
    </div>);
});

export default Tab;