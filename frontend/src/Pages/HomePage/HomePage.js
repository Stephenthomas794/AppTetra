import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from '../../Components/Nav/Nav';

class HomePage extends Component {
    constructor() {
    super();
    this.state = {

        }
    }
    render(){
    return (
        <>
        <Nav />
        <Button href="/SubmitProject"variant="primary">Submit A Project</Button>{' '}
        </>
    )
    }
}

export default HomePage;
