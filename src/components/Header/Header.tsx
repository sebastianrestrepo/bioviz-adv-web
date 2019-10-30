import React, { Component } from 'react';
import './_Header.scss'
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import authStore from '../../stores/authStore';
import SearchBar from '../SearchBar/SearchBar';

class Header extends Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (<header>
      <SearchBar />
    </header>);
  }
}

export default observer(Header);