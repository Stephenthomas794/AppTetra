import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './Pages/LoginPage/LoginPage';
import Documentation from './Pages/Documentation/Documentation';
import HomePage from './Pages/HomePage/HomePage';
import SubmitProject from './Pages/SubmitProject/SubmitProject';

import './App.css';

class App extends Component {
  constructor () {                                                                                                                  
  super();
  this.state = { 
        
  }
  }
  
  render(){

  return (
    <div className="App">
        <Switch> 
            <Route path="/" component= { LoginPage }exact />
            <Route path="/Documentation" component= { Documentation } />
            <Route path="/HomePage" component= { HomePage } /> 
            <Route path="/SubmitProject" component= { SubmitProject } />
        </Switch>
    </div>
  );
}
}
export default App;
