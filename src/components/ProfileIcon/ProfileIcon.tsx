import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import authStore from '../../stores/authStore';

interface ProfileIconProps {
    history: any
}

class ProfileIcon extends Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (<div className="profile-icon">
        <button className="profile-photo">
        <img src="./assets/generic-profile-photo.png" alt="" width="35" />
        </button>
           <button
                onClick={() => {
                    //this.props.history.push("/");
                    authStore.signOut();
                }}>
                Cerrar Sesión
                </button>
    </div>);
  }
}

export default observer(ProfileIcon);