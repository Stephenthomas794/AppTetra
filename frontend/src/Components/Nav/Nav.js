import React, { Component } from 'react';
import './Nav.css';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

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
 
     <Navbar.Text>

    <a href="/Documentation">Documentation</a>

    { this.props.isLogged ? <a href="/" onClick={this.props.changeLogTrue}>  Log out</a> : '' }

    </Navbar.Text>

  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
      <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-3" />
      <Button variant="outline-primary">Search</Button>
    </Form>
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
