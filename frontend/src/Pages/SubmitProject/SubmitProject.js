import React, { Component } from 'react';

import Nav from '../../Components/Nav/Nav';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SubmitProject extends Component {
    constructor() {
    super();
    this.state = {
        projectName: '',
        git: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleGit = this.handleGit.bind(this);
    this.handleProjectName = this.handleProjectName.bind(this);
    }
    
    handleFormSubmit(event){
        event.preventDefault();
    
    }

    handleProjectName(event){
        this.setState({ projectName: event.target.value })
    }

    handleGit(event){
        this.setState({ git: event.target.value })
    }

    render() {
    return (
        <div className= 'SubmitProject'>
        <Nav />
        <Form onSubmit={this.handleFormSubmit}>
  
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Enter Project Name</Form.Label>
    <Form.Control as="textarea" rows={1} value = { this.state.projectName} onChange={ this.handleProjectName }/>
  </Form.Group>

<Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Submit Your Github Repository</Form.Label>
    <Form.Control as="textarea" rows={1} value = { this.state.git } onChange={ this.handleGit }/>
  </Form.Group>

    <Button variant="primary" type="submit">
        Submit
    </Button>

</Form>
        </div>
    )
    }
}

export default SubmitProject;
