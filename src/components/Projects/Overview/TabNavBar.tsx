import React, { Component } from 'react';
import SearchBar from '../../SearchBar/SearchBar';
import projectsStore from '../../../stores/projectsStore';
import { observer } from 'mobx-react';
import ProfileMenu from '../../ProfileMenu/ProfileMenu';
import Tab from './Tab';

class TabNavBar extends Component {

    constructor(props: {}) {
        super(props);
    }

    render() {
        return <section className="project-tabbar-navigation">
            {
                projectsStore.projectTabs.map((tab,index)=> {
               if (tab.open) { return <Tab key={index} name={tab.name} selected={tab.selected} id={index}></Tab> }
                })
            }
           
            <ProfileMenu />
        </section>
    }
}

export default observer(TabNavBar);