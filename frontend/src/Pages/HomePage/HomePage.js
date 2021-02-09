import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Header } from 'semantic-ui-react'

import Nav from '../../Components/Nav/Nav';
import Projects from '../../Components/Projects/Projects';
import Purchases from '../../Components/Purchases/Purchases';
import Running from '../../Components/Running/Running';

class HomePage extends Component {
    constructor() {
    super();
    this.state = {
        email: undefined,       
        list: [],
        listOfPurchases: [],
        listOfRunning: []
        }
        this.updateList = this.updateList.bind(this);
  //      this.updateListOfPurchases = this.updateListOfPurchases.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handlePopulate = this.handlePopulate.bind(this);
        this.handlePopulateOfPurchases = this.handlePopulateOfPurchases.bind(this);
        this.handlePopulateOfRunning = this.handlePopulateOfRunning.bind(this);
        this.handleRun = this.handleRun.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }
    
    updateList(list){
        this.setState({
            list: list
        })
    }

    updateListOfPuchases(listOfPurchases){
        this.setState({
            listOfPurchases: listOfPurchases
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
            var listOfPurchases = [];
            var listOfRunning = [];
            for (var i = 0; i < len; i++){
                list.push(this.handlePopulate(data['projectName'][0], data['git'][0], data['time'][0], data['entries'][0], i))
            }
            const size = data['purchases'][0].length;
            for (var i = 0; i < size; i++){
                listOfPurchases.push(this.handlePopulateOfPurchases(data['purchases'][0], data['inUse'][0], i))
                console.log(size)
                console.log(data['purchases'][0])
            }
            const sizeRunning = data['inUse'][0].length;
            for (var i = 0; i < sizeRunning; i++){
                listOfRunning.push(this.handlePopulateOfRunning(data['inUse'][0], i))
                console.log(size)
            }
            this.setState({
                list: list
            })
            this.setState({
                listOfPurchases: listOfPurchases
            })
            this.setState({
                listOfRunning: listOfRunning
            })
            this.updateList(list)
    //        this.updateListOfPurchases(listOfPurchases)
            this.forceUpdate();
        }
    }
    )
    }

    handleRun(event, i){
        console.log(event.target.value)
        const data = { projectID: event.target.value, email: localStorage.getItem('email') }
        fetch(`http://127.0.0.1:5000/api/RunProgram`, {
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

    handleStop(event, i){
        console.log(event.target.value);
        const data = { inUse: event.target.value, email: localStorage.getItem('email') }
        fetch(`http://127.0.0.1:5000/api/StopProgram`, {
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
            })  
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

    handlePopulateOfPurchases(projectID, inUse, i){
    return(
           <Table striped bordered hover variant="dark" key={i}>
    <thead>
        <tr>
<th colSpan="2">
Project Name: 
   </th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td colSpan="2">
  ProjectID: {projectID[i]}
    </td>
    </tr>
    <tr>
        <td>
  Currently Running?: {inUse[i]}
    </td>
        </tr>
    <tr>
        <td>
 <Button value={projectID[i]} onClick={event => this.handleRun(event, "value")} variant="primary">Run Program</Button>
 <Button value={inUse[i]} onClick={event => this.handleStop(event, "value")} variant="danger">Stop Program</Button>
    </td>
        </tr>
    </tbody>
    </Table>
    )
    }

    handlePopulateOfRunning(inUse, i){
    return(
           <Table striped bordered hover variant="dark" key={i}>
    <thead>
        <tr>
<th colSpan="2">
Project Name: 
   </th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td colSpan="2">
  ProjectID: {inUse[i]}
    </td>
    </tr>
    </tbody>
    </Table>
    )   
    }
    render(){
    return (
        <>
        <Button href="/SubmitProject"variant="success">Submit A Project</Button>
        <Header as='h1'>Your Projects</Header>
        <Projects list={ this.state.list } handleLoad= { this.handleLoad} />
        <Header as='h1'>Your Purchases</Header> 
        <Purchases listOfPurchases={ this.state.listOfPurchases } handleLoad= { this.handleLoad} />
        <Header as='h1'>Running Programs</Header>  
        <Running listOfRunning={ this.state.listOfRunning } handleLoad= { this.handleLoad} />
        </>
    )
    }
}

export default HomePage;
