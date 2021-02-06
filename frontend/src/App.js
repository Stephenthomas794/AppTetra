import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './Pages/LoginPage/LoginPage';
import Documentation from './Pages/Documentation/Documentation';
import HomePage from './Pages/HomePage/HomePage';
import SubmitProject from './Pages/SubmitProject/SubmitProject';
import LoadingPage from './Pages/LoadingPage/LoadingPage';
import Results from './Pages/Results/Results';
import Nav from './Components/Nav/Nav';
import './App.css';

class App extends Component {
  constructor () {                                                                                                                  
  super();
  this.state = { 
    projectName: undefined        
  }
    this.setProjectName = this.setProjectName.bind(this)
  }

    setProjectName(projectName){
        this.setState({
            projectName: projectName
        })
        console.log(this.state.projectName);
    }

  render(){
  return (
    <div className="App">
        <Nav setProjectName={this.setProjectName}/>
        <Switch> 
            <Route path="/" component= { LoginPage } exact />
            <Route path="/Documentation" component= { Documentation } />
            <Route path="/HomePage" component={ HomePage } />
            <Route path="/SubmitProject" component= { SubmitProject } />
            <Route path="/LoadingPage" component={ LoadingPage } />
            <Route path="/Results" component={(routeProps)=> <Results projectName={this.state.projectName} {...routeProps} />} />
        </Switch>
    </div>
  );
}
}

export default App;
