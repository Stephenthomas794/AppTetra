import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import ProjectInfo from '../../Components/ProjectInfo/ProjectInfo';

class ProjectProfile extends Component {
    constructor(props){
    super(props);
    this.state = {
        projectName: undefined,
        projectID: undefined,
        list: []
    }
//        this.setProjectName = this.setProjectName.bind(this);
//        this.setProjectID = this.setProjectID.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handlePopulate = this.handlePopulate.bind(this);
        this.updateList = this.updateList.bind(this);
    }

//    setProjectID(projectID){
//        this.setState({
 //           projectID: projectID
//        })
//        console.log(this.state.projectID)
//    }

    updateList(list){
        this.setState({
            list: list
        })
    }

    componentDidMount(){
//        console.log(this.props.projectID)
//        this.setProjectID(this.props.projectID)
//        this.setProjectName(this.props.projectName)
        return this.handleLoad()
    }

    handleLoad(){
        console.log(this.props.projectName)
        console.log(this.props.projectID)
        var list = []
        const data = { projectID: this.props.projectID}
        fetch(`http://127.0.0.1:5000/api/GetProjectInfo`, {
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
            console.log('Success', data.projectName);
            var i = 0
            list.push(this.handlePopulate(data.projectName, i))

        this.setState({
            list: list
        })
        this.updateList(list)
        this.forceUpdate();
        })

    }

    handleViewProject(event, i){
        console.log(event.target.value)
        this.props.history.push("/Purchase")
        //Send Project Number to next Page to pull data for project
    }

    handlePopulate(projectName, i){
    return(
     <Table striped bordered hover variant="dark" key={i}>
    <thead>
        <tr>
        <th>
    {projectName}
     </th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>
  Description Here
    </td>
        <td>
        <Button value={this.props.projectID} onClick={event => this.handleViewProject(event, "value")} variant="primary">Purchase</Button>
        </td>
        </tr>
    </tbody>
    </Table>
)
    }
    render() {
    return (
        <>
        <ProjectInfo list={ this.state.list } handleLoad= { this.handleLoad} />
        </>
    )
    }
}

export default ProjectProfile;
