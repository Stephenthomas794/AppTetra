import React, {Component}  from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

import './SignIn.css';

class SignIn extends Component {                                                                                                    
    constructor() {
    super();
    this.state = {
        email: '',
        password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    //this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }
    
    handleEmailChange(event){
        this.setState({ email: event.target.value })
    }

    handlePasswordChange(event){
        this.setState({ password: event.target.value })
    }

    render() {
    return (
        <div className= 'SignIn'>
    <Form> 
    
    <Form.Group controlId="BasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value = { this.state.email} onChange={ this.handleEmailChange } />
    </Form.Group>

    <Form.Group controlId="BasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" value = { this.state.password} onChange={ this.handlePasswordChange } />
    </Form.Group>

    <Button variant="primary" type="submit">
        Submit
    </Button>

  </Form>
  </div>
    )   
    }   
}

export default SignIn;
