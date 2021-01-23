import React, {Component}  from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

import './SignUp.css';

class SignUp extends Component {
    constructor() {
    super();
    this.state = {
            email: '',
            name: '',
            account: '',
            password: '',
            confirmPassword: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    //    this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.confirmPasswordMatch = this.confirmPasswordMatch.bind(this);
    }

    handleEmailChange(event){
        this.setState({ email: event.target.value })
    }

    handleNameChange(event){
        this.setState({ name: event.target.value })
    }

    handlePasswordChange(event){
        this.setState({ password: event.target.value })
    }

    handleConfirmPasswordChange(event){
        this.setState({ confirmPassword: event.target.value })
    }
    
    handleAccountChange(event){
        this.setState({ account: event.target.value })
    }

    confirmPasswordMatch(){
        if (this.state.password === this.state.confirmPassword){
            return true
        } else{
            return false
        }
    }

    render() {
    return (
    <div className="SignUp"> 
    <Form onSubmit={this.handleFormSubmit} >

<Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" 
    required value = { this.state.email} 
    onChange={ this.handleEmailChange } />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group>
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Name" 
    required value = { this.state.name} 
    onChange={ this.handleNameChange }  />
  </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Are you a Developer?</Form.Label>
                <Form.Control as="select"
                required  value = { this.state.account }
                onChange={ this.handleAccountChange }  >
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                </Form.Control>
           </Form.Group>

  <Form.Group controlId="SignUpBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Enter Password" 
    required value = { this.state.password} 
    onChange={ this.handlePasswordChange } />
  </Form.Group>

    <Form.Group controlId="SignUpConfirmPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="Confirm Password" 
    required value = { this.state.confirmPassword} 
    onChange={ this.handleConfirmPasswordChange } />
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Submit
  </Button>

</Form>        
    </div>
    )
    }
}

export default SignUp;
