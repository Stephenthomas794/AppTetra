import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';

import Nav from '../../Components/Nav/Nav';

class Documentation extends Component {

render(){

    return (
    <>
    <Nav />
    <Header as='h1'>How to Submit Code to AppTetra</Header>
    <ListGroup>
        <ListGroup.Item>Always Submit a Github Repo</ListGroup.Item>
        <ListGroup.Item></ListGroup.Item>
        <ListGroup.Item></ListGroup.Item>
        <ListGroup.Item></ListGroup.Item>
    </ListGroup>
    <Header as='h1'>How Will Instances Be Launched</Header>
    <ListGroup>
        <ListGroup.Item>Latest Version of Yum</ListGroup.Item>
    </ListGroup>
    </>
    )
    }
}

export default Documentation;
