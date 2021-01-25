import React, {Component}  from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLogTrue } from '../../actions/' 

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
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }
    
    handleEmailChange(event){
        this.setState({ email: event.target.value })
    }

    handlePasswordChange(event){
        this.setState({ password: event.target.value })
    }

    handleFormSubmit(event){
    event.preventDefault();

    const data = { email: this.state.email, password: this.state.password }
    fetch(`http://127.0.0.1:5000/api/signIn`, {
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
        if (data.message === true){
            window.alert("You do not have an account");
        } else if (data.message === false){
            window.alert("The password you entered does not match what we have on file");
        } else{
        console.log(data.message)
        console.log(this.props.isLogged)
        this.props.changeLogTrue();
        console.log(this.props.isLogged)
        localStorage.setItem('jwtToken', data.message);
        this.props.history.push('/HomePage');
        }
        })
    }
    
    render() {
    return (
        <div className= 'SignIn'>
    <Form onSubmit={this.handleFormSubmit}> 
    
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

const mapStateToProps = (state) => {
    return{
        isLogged: state.isLogged
    }
}

const mapDispatchToProps = () => {
    return {
        changeLogTrue
    }
}    
export default connect(mapStateToProps, mapDispatchToProps()) (withRouter(SignIn));
