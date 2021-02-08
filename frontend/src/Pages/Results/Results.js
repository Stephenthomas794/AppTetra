import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

import ProjectResults from '../../Components/ProjectResults/ProjectResults';

class Results extends Component {
    constructor(props) {
    super(props);
    this.state ={
        projectName: undefined,
        list: []
    }
        this.handleLoad = this.handleLoad.bind(this);
        this.handlePopulate = this.handlePopulate.bind(this);
        this.updateList = this.updateList.bind(this);
        this.handleViewProject = this.handleViewProject.bind(this);
    }

    updateList(list){
        this.setState({
            list: list
        })
    }

    componentDidMount(){
        return this.handleLoad();
    }

    handleLoad(){
        var projectName = this.props.projectName;
        var projectID = this.props.projectID;
        console.log(projectID)
        var list = [];
        if (projectName){
        for (var i = 0; i < projectName.length; i++){
            list.push(this.handlePopulate(projectName, projectID, i))
            console.log(projectName[i])
        }
        this.setState({
            list: list
        })
        this.updateList(list)
        this.forceUpdate();

    }
}

    handleViewProject(event, i){
        console.log(event.target.value)
        this.props.setProjectID(event.target.value)
        this.props.history.push("/ProjectProfile")
        //Send Project Number to next Page to pull data for project
    }

    handlePopulate(projectName,projectID, i){
    return(
     <Table striped bordered hover variant="dark" key={i}>
    <thead>
        <tr>
        <th>
    {projectName[i]}
     </th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>
  Description Here 
    </td>
        <td>
        <Button value={projectID[i]} onClick={event => this.handleViewProject(event, "value")}variant="primary">View Project</Button>
        </td>
        </tr>
    </tbody>
    </Table>
    )
    }
render(){
    return (
        <>
        <ProjectResults list={ this.state.list } handleLoad= { this.handleLoad} />
        </>
    )
}
}

export default Results;
