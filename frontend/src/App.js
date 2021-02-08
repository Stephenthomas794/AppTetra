import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './Pages/LoginPage/LoginPage';
import Documentation from './Pages/Documentation/Documentation';
import HomePage from './Pages/HomePage/HomePage';
import SubmitProject from './Pages/SubmitProject/SubmitProject';
import LoadingPage from './Pages/LoadingPage/LoadingPage';
import Results from './Pages/Results/Results';
import Nav from './Components/Nav/Nav';
import ProjectProfile from './Pages/ProjectProfile/ProjectProfile';
import Purchase from './Pages/Purchase/Purchase';

import './App.css';

class App extends Component {
  constructor () {                                                                                                                  
  super();
  this.state = { 
    projectName: undefined,        
    projectID: undefined
  }
    this.setProjectName = this.setProjectName.bind(this)
    this.setProjectID = this.setProjectID.bind(this);
  }

    setProjectID(projectID){
        this.setState({
            projectID: projectID
        })
        console.log(this.state.projectID)
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
        <Nav setProjectID={this.setProjectID} setProjectName={this.setProjectName}/>
        <Switch> 
            <Route path="/" component= { LoginPage } exact />
            <Route path="/Documentation" component= { Documentation } />
            <Route path="/HomePage" component={ HomePage } />
            <Route path="/SubmitProject" component= { SubmitProject } />
            <Route path="/LoadingPage" component={ LoadingPage } />
            <Route path="/Results" component={(routeProps)=> <Results setProjectID={this.setProjectID} projectID={this.state.projectID} projectName={this.state.projectName} {...routeProps} />} 
            /> 
            <Route path="/ProjectProfile" component={(routeProps)=> <ProjectProfile projectID={this.state.projectID} projectName={this.state.projectName} {...routeProps} />} 
             /> 
            <Route path="/Purchase" component={(routeProps)=> <Purchase projectID={this.state.projectID} projectName={this.state.projectName} {...routeProps} />} 
             />  
        </Switch>
    </div>
  );
}
}

export default App;
