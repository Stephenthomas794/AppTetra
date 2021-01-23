import React, { Component } from 'react';

import Nav from '../../Components/Nav/Nav';
import SignUp from '../../Components/SignUp/SignUp';
import SignIn from '../../Components/SignIn/SignIn';

import Table from 'react-bootstrap/Table';

class LoginPage extends Component {
    constructor() {
    super();
    this.state = {

        }
    }

    render(){
    return(
        <div className="LoginPage">
        <Nav />
        <header className="LoginPage-header">
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>
                    Sign In
                </th>
                <th>
                    Sign Up
                </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <td>
                   <SignIn />    
                </td>
                <td>
                    <SignUp /> 
                </td>
                </tr>
            </tbody>
            </Table>
        </header>
        </div>
    )
    }
}

export default LoginPage;
