import React, { Component } from 'react';
import './Nav.css';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

class Nav extends Component {
    constructor(props){
    super();
    this.state = {
    
    }

    }


render(){

    return (
    <div className="Nav">
    <Navbar bg="dark" variant="dark">
  <Navbar.Brand href="/">AppTetra</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
    <a href="/Documentation">Documentation</a>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
    </div>
)}};

export default Nav;
