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

//import axios from 'axios';

class Nav extends Component {
    constructor() {
    super();
    this.state = {
        searchValue:  ''
    }
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleSearchValueChange(event){
        this.setState({
            searchValue: event.target.value
        })
    }

    handleFormSubmit(event){
        event.preventDefault();
        const email = localStorage.getItem('email');
        console.log(this.state.searchValue);
        var searchValue = this.state.searchValue
        
        const data = {searchValue: searchValue}
        fetch(`http://127.0.0.1:5000/api/SearchProjects`, {
            crossDomain: true,
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success', data);
            console.log(data.message)
            console.log(data.projectID)
            this.props.setProjectName(data.message)
            console.log(data.projectID)
            this.props.setProjectID(data.projectID)
            this.props.history.push('/Results');
        })
        }
    
        
/*
state = {
        loading: false,
        value: '',
        projectResults: null
    };

    search = async val => {
        this.setState({ 
            loading: true 
            });
        const res await axios(
            'http://127.0.0.1/api/SearchMongo/query=${val}'
        );
        projectResults = await res.data.results;

        this.setState({ projectResults, loading: false})
    }

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value })
    };

    get renderProjects(){
        let projects = ''
        if (this.state.projectResults){
            movies = list.push(this.state.projectResults)
        }
    }
*/
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
      <FormControl value={ this.state.searchValue } onChange={ this.handleSearchValueChange } type="text" placeholder="Search" className="mr-sm-3" />
      <Button onClick= {this.handleFormSubmit} variant="outline-primary">Search</Button>
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
