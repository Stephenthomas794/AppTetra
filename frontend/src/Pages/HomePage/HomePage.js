import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Header } from 'semantic-ui-react'

import Nav from '../../Components/Nav/Nav';
import Projects from '../../Components/Projects/Projects';

class HomePage extends Component {
    constructor() {
    super();
    this.state = {
        email: undefined,       
        list: []
        }
        this.updateList = this.updateList.bind(this)
        this.handleLoad = this.handleLoad.bind(this)
        this.handlePopulate = this.handlePopulate.bind(this);
    }
    
    updateList(list){
        this.setState({
            list: list
        })
    }

    componentDidMount(){
        return this.handleLoad();
    }
    
    handleLoad() {
    this.state.email = localStorage.getItem('email')
    console.log(this.state.email);
    const data = { email: this.state.email }
    fetch('http://127.0.0.1:5000/api/Projects', {
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
        console.log(data);
        //[MainArray] //[Value i]
        //Entries [MainArry] [ArrayofValues i] [Value j]
        if (data.message !== false){
            const len = data['projectName'][0].length;
            console.log(len)
            var list = [];
            for (var i = 0; i < len; i++){
                list.push(this.handlePopulate(data['projectName'][0], data['git'][0], data['time'][0], data['entries'][0], i))
            }
            this.setState({
                list: list
            })
            this.updateList(list)
            this.forceUpdate();
        }
    }
    )
    }

    handlePopulate(projectName, git, time, entries, i){
    return(
           <Table striped bordered hover variant="dark" key={i}>
    <thead>
        <tr>
<th colSpan="2">       
Project Name: {projectName[i]}      
   </th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td colSpan="2">
  GitHub: {git[i]} 
    </td>
    </tr>
    <tr>
        <td>
  Time: {time[i]} 
    </td>
        </tr>
    </tbody>
    </Table> 
    )
    }

    render(){
    return (
        <>
        <Button href="/SubmitProject"variant="primary">Submit A Project</Button>
        <Header as='h1'>Your Projects</Header>
        <Projects list={ this.state.list } handleLoad= { this.handleLoad} />
        <Header as='h1'>Your Purchases</Header> 
        </>
    )
    }
}

export default HomePage;
