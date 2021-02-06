import React, { Component } from 'react';

import Nav from '../../Components/Nav/Nav';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SubmitProject extends Component {
    constructor(props) {
    super(props);
    this.state = {
        projectName: '',
        git: '',
        entries: [],
        time: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleGit = this.handleGit.bind(this);
    this.handleProjectName = this.handleProjectName.bind(this);
    this.handleTime = this.handleTime.bind(this)
    }
   
  addClick(){
    this.setState(prevState => ({ 
    	entries: [...prevState.entries, '']
    }))
  }
  
  createUI(){
     return this.state.entries.map((el, i) => (
       <div key={i}>
    	    <Form.Control as="textarea" rows={1} value ={el } onChange={this.handleChange.bind(this,i)} />
    	     <Button variant="primary" value='remove' onClick={this.removeClick.bind(this, i)}>
             Remove
             </Button>
       </div>          
     ))
  }
  
  handleChange(i, event) {
     let entries = [...this.state.entries];
     entries[i] = event.target.value;
     this.setState({ entries });
  }
  
  removeClick(i){
     let entries = [...this.state.entries];
     entries.splice(i, 1);
     this.setState({ entries });
  }

    handleFormSubmit(event){
        event.preventDefault();
        const email = localStorage.getItem('email')
        const data = { email: email, projectName: this.state.projectName, git: this.state.git, time: this.state.time, entries: this.state.entries }
        fetch(`http://127.0.0.1:5000/api/SubmitProject`, {
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
            this.props.history.push('/LoadingPage');
            })
        }
    

    handleProjectName(event){
        this.setState({ projectName: event.target.value })
    }

    handleGit(event){
        this.setState({ git: event.target.value })
    }

    handleTime(event){
        this.setState({ time: event.target.value })
    }

    render() {
    return (
        <div className= 'SubmitProject'>
        <Form onSubmit={this.handleFormSubmit}>
  
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Enter Project Name</Form.Label>
    <Form.Control as="textarea" rows={1} value = { this.state.projectName} onChange={ this.handleProjectName }/>
  </Form.Group>

<Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Submit Your Github Repository</Form.Label>
    <Form.Control as="textarea" rows={1} value = { this.state.git } onChange={ this.handleGit }/>
  </Form.Group>

<Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>How Long Will This Program Run In Days</Form.Label>
    <Form.Control as="textarea" rows={1} value = { this.state.time } onChange={ this.handleTime }/> 
  </Form.Group>


<Form.Group controlId="exampleForm.ControlTextarea1">
<Form.Label>What Entries Do You Need From User</Form.Label>

          {this.createUI()}
           <Button variant="primary" value='add more' onClick={this.addClick.bind(this)}>
            Add More
            </Button>

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
