import React, { Component } from 'react';
import './Nav.css';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLogFalse } from '../../actions/'; 

class Nav extends Component {
    
    render() {
    return (
    <div className="Nav">
    <Navbar bg="dark" variant="dark">
  
  <Navbar.Brand href="/">AppTetra</Navbar.Brand>
  
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
    
    <a href="/Documentation">Documentation</a>

    { this.props.isLogged ? <a href="/" onClick={this.props.changeLogTrue}>Log out</a> : '' }
    
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
    </div>
)}};

const mapStateToProps = (state) => {
    return{
        isLogged: state.isLogged
    }
}

const mapDispatchToProps = () => {
    return {
        changeLogFalse
    }
}

export default connect(mapStateToProps, mapDispatchToProps()) (withRouter(Nav));
