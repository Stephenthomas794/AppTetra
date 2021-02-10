import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';

import Nav from '../../Components/Nav/Nav';

class Documentation extends Component {

render(){

    return (
    <>
    <Header as='h1'>Housekeeping</Header>
    <ListGroup>
        <ListGroup.Item>1. Code can be submited either via Github or as AWS Lambda</ListGroup.Item>
        <ListGroup.Item>Currently we can only accept Github</ListGroup.Item>
        <ListGroup.Item>2. If your submission fails to launch it will not appear in our search</ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
    </ListGroup>
    <Header as='h1'>For Github Submission</Header>
    <ListGroup>
        <ListGroup.Item>Docker and Docker-Compose will be installed</ListGroup.Item>
        <ListGroup.Item>Docker-Compose will be used to launch your application</ListGroup.Item>
    </ListGroup>
    <Header as='h1'>For AWS Lambda Submissions</Header>
        <ListGroup.Item> </ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
        <ListGroup.Item> </ListGroup.Item>
    </>
    )
    }
}

export default Documentation;
