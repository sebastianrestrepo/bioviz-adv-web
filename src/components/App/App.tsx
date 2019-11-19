import React, { Component } from 'react';
import './App.scss';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Projects from '../Projects/Projects';
import Tagging from '../Tagging/Tagging';
interface AppProps {
  history: any
}

class App extends Component {
  constructor(props: {}) {
    super(props);

  }

  render() {
    return (<div className="App">
      <HashRouter>
        <Route exact path="/" component={Login} />
        <Route  path="/home" component={Home} />
        <Route  path="/projects" component={Projects} />
      </HashRouter>
    </div>
    );
  }
}

export default observer(App);
