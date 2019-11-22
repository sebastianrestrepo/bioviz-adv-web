import React from 'react';
import './_Home.scss'
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable, autorun } from 'mobx';
import DashMenu from '../DashMenu/DashMenu';
import genStore from '../../stores/genStore';
import MainNavBar from '../MainNavBar/MainNavBar';

interface HomeProps {
    history: any
}

@observer class Home extends React.Component<HomeProps> {

    @observable signInForm: boolean = true;

    constructor(props: any) {
        super(props);
        autorun(() => {
            if (!authStore.isLogged) {
                props.history.push("/login")
            }
        });

    }

    render() {
        return (<div className="home">
            <DashMenu />
            <div className="page-layout">
                <MainNavBar title={genStore.navBarTitle} />
            </div>
        </div>);
    }
}

export default observer(Home);