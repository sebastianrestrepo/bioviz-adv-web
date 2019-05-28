import React, { Component } from 'react';
import { observer } from 'mobx-react';
import authStore from '../../stores/authStore';
import { observable } from 'mobx';

interface HomeProps {
    history: any
}

@observer class Home extends React.Component<HomeProps> {

    @observable signInForm: boolean = true;

    constructor(props: any) {
        super(props);
        if (!authStore.isLogged) {
            props.history.push("/");
        }
    }

    render() {
        return (<div className="Home">
            Home
            <button
                onClick={() => {
                    authStore.signOut();
                    this.props.history.push("/");
                }}>
                Cerrar Sesión
                </button>
        </div>);
    }
}

export default observer(Home);