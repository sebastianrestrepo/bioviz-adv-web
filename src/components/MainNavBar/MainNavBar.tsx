import React from 'react';
import './_MainNavBar.scss'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

interface MainNavBarProps {
    title: string
}

@observer class MainNavBar extends React.Component<MainNavBarProps> {

    @observable signInForm: boolean = true;

    constructor(props: any) {
        super(props);
    }

    render() {
        return (<div className="mainNavBar">
            <h3>{this.props.title}</h3>
            <ProfileMenu />
        </div>);
    }
}

export default observer(MainNavBar);