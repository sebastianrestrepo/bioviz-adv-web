import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import authStore from '../../stores/authStore';

interface ProfileIconProps {
  history: any
}

class ProfileMenu extends Component {

  @observable showProfileMenu = false;

  @observable profileBtnSelected = false;
  @observable configBtnSelected = false;
  @observable signOutBtnSelected = false;

  @observable profileBtnOver = false;
  @observable configBtnOver = false;
  @observable signOutBtnOver = false;


  constructor(props: any) {
    super(props);
  }

  render() {
    return (<div className="profile-icon">
      <button onClick={() => {
        this.showProfileMenu = !this.showProfileMenu;
      }} className="profile-photo">
        <img src="./assets/generic-profile-photo.png" alt="" width="35" />
      </button>
      {(this.showProfileMenu)
        ?
        <div className="complete-menu">
          <div className="profile-menu">
            <button
              onClick={() => {
                this.profileBtnSelected = !this.profileBtnSelected;
                this.configBtnSelected = false;
                this.signOutBtnSelected = false;
              }}
              onMouseOver={() => {
                this.profileBtnOver = true;
              }}
              onMouseOut={() => {
                this.profileBtnOver = false;
                console.log('lmao');
              }}
              style={{
                backgroundColor: this.profileBtnSelected
                  ? '#35E285'
                  : this.profileBtnOver ? '#C4C4C4' : '#FFFFFF',
              }}>VER PERFIL</button>
            <button className="config-btn"
              onClick={() => {
                this.profileBtnSelected = false;
                this.configBtnSelected = !this.configBtnSelected;
                this.signOutBtnSelected = false;
              }}
              onMouseOver={() => {
                this.configBtnOver = true;
              }}
              onMouseOut={() => {
                this.configBtnOver = false;
                console.log('lmao');
              }}
              style={{
                backgroundColor: this.configBtnSelected
                  ? '#35E285'
                  : this.configBtnOver ? '#C4C4C4' : '#FFFFFF'
              }}>CONFIGURACIÓN</button>
            <button
              onMouseOver={() => {
                this.signOutBtnOver = true;
              }}
              onMouseOut={() => {
                this.signOutBtnOver = false;
                console.log('lmao');
              }}
              style={{
                backgroundColor: this.signOutBtnSelected
                  ? '#35E285'
                  : this.signOutBtnOver ? '#C4C4C4' : '#FFFFFF'
              }}
              onClick={() => {
                //this.props.history.push("/");
                authStore.signOut();
                console.log('CERRANDO SESIÓN LOL');

                this.profileBtnSelected = false;
                this.configBtnSelected = false;
                this.signOutBtnSelected = !this.signOutBtnSelected;
              }}>
              CERRAR SESIÓN
          </button>
          </div>
        </div>
        : ''
      }

    </div>);
  }
}

export default observer(ProfileMenu);