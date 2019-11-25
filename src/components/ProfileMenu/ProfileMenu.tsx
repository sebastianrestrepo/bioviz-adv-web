import React, { Component } from 'react';
import './_ProfileMenu.scss'
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Redirect } from "react-router-dom";
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

  @observable profilePhoto: any = false;


  constructor(props: any) {
    super(props);
  }

  render() {

    return (<div className="profile-icon" onClick={() => {
      this.showProfileMenu = !this.showProfileMenu;
    }}>
      {(!authStore.isLogged) ? <Redirect to='/' /> : ''}
      <h4>{authStore.currentUserInfo.name}</h4>
      <button  className="profile-photo">
        {(authStore.profilePhotoURL !== "")
          ? <img src={"" + authStore.profilePhotoURL + ""} alt="" width="37"
            style={{
              borderRadius: '100px'
            }} />
          : <img src="./assets/generic-profile-photo.png" alt="" width="35" />
        }
      </button>
      {(this.showProfileMenu)
        ?
        <div className="complete-menu firstdisplay">
          <div className="profile-menu">
            <button
              onClick={() => {
                this.profileBtnSelected = !this.profileBtnSelected;
                this.configBtnSelected = false;
                this.signOutBtnSelected = false;
              }}
              onMouseOver={() => {
                //this.profileBtnOver = true;
                this.profileBtnSelected = true;
              }}
              onMouseOut={() => {
                //this.profileBtnOver = false;
                this.profileBtnSelected = false;
                console.log('lmao');
              }}
              style={{
                backgroundColor: this.profileBtnSelected
                  ? '#AFEA7D'
                  : this.profileBtnOver ? '#AFEA7D' : '#FFFFFF',
              }}>Ver perfil</button>
            <button className="config-btn"
              onClick={() => {
                this.profileBtnSelected = false;
                this.configBtnSelected = !this.configBtnSelected;
                this.signOutBtnSelected = false;
              }}
              onMouseOver={() => {
                //this.configBtnOver = true;
                this.configBtnSelected = true;
              }}
              onMouseOut={() => {
                //this.configBtnOver = false;
                this.configBtnSelected = false;
                console.log('lmao');
              }}
              style={{
                backgroundColor: this.configBtnSelected
                  ? '#AFEA7D'
                  : this.configBtnOver ? '#AFEA7D' : '#FFFFFF'
              }}>Configuración</button>
            <button
              onMouseOver={() => {
                //this.signOutBtnOver = true;
                this.signOutBtnSelected = true;
              }}
              onMouseOut={() => {
                //this.signOutBtnOver = false;
                this.signOutBtnSelected = false;
                console.log('lmao');
              }}
              style={{
                backgroundColor: this.signOutBtnSelected
                  ? '#AFEA7D'
                  : this.signOutBtnOver ? '#AFEA7D' : '#FFFFFF'
              }}
              onClick={() => {
                //this.props.history.push("/");
                this.profileBtnSelected = false;
                this.configBtnSelected = false;
                this.signOutBtnSelected = !this.signOutBtnSelected;
                authStore.signOut();

              }}>
              Cerrar sesión
          </button>
          </div>
        </div>
        : ''
      }

    </div>);
  }
}

export default observer(ProfileMenu);