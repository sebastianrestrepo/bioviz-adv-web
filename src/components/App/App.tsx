import React, { Component } from 'react';
import './App.scss';
import Login from '../Login/Login';
import Home from '../Home/Home';
import { observer } from 'mobx-react';
import { Route, Switch } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Projects from '../Projects/Projects';
import projectsStore from '../../stores/projectsStore';
import ProjectOverview from '../Projects/Overview/ProjectOverview';
import authStore from '../../stores/authStore';
interface AppProps {
  history: any
}

class App extends Component {
  constructor(props: {}) {
    super(props);
     projectsStore.onRetrieveProjects() 
  }

  render() {
    return (<div className="App">
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Switch>
        <Route exact path="/projects" component={Projects} />
        <Route path="/projects/:projectID" render={props => {
        return <ProjectOverview {...props} projectId={props.match.params.projectID} />;
      }} />
        </Switch>
        
      </HashRouter>
    </div>
    );
  }
}

export default observer(App);
