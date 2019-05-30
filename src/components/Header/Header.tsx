import React, { Component } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import authStore from '../../stores/authStore';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import SearchBar from '../SearchBar/SearchBar';

class Header extends Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (<header>
      <h3>PROYECTOS</h3>
      <SearchBar />
      <ProfileMenu />
    </header>);
  }
}

export default observer(Header);