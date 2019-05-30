import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import authStore from '../../stores/authStore';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

class Header extends Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (<header>
      <h3>HOME</h3>
            <ProfileMenu />
    </header>);
  }
}

export default observer(Header);