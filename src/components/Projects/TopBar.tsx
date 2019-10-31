import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import projectsStore from '../../stores/projectsStore';
import { observer } from 'mobx-react';

class TopBar extends Component {

    constructor(props: {}) {
        super(props);
    }

    render() {
        return <section className="project-topbar">
            <SearchBar></SearchBar>
            <div className="actions">
                <button className="green-button"><img src="./assets/gen-icons/folder.svg" alt="" /> Crear carpeta</button>
                <button className="green-button"
                    onClick={() => {
                        projectsStore.onCreateProject()
                    }}
                >
                    <img src="./assets/gen-icons/rocket.svg" alt="" /> Crear proyecto</button>
            </div>
        </section>
    }
}

export default observer(TopBar);