import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Projects from '../Projects/Projects';
import Chat from '../Chat/Chat';
import Tagging from '../Tagging/Tagging';

class App extends Component {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (<div className="App">
      <HashRouter basename="/bioviz-adv-web">
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Tagging} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/chat" component={Chat} />
      </HashRouter>
    </div>
    );
  }
}

export default observer(App);
