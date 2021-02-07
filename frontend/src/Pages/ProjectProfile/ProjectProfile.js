import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

class ProjectProfile extends Component {
    constructor(props){
    super();
    this.state = {
        projectName: undefined,
        projectID: undefined
    }
//        this.setProjectName = this.setProjectName.bind(this);
        this.setProjectID = this.setProjectID.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    setProjectID(projectID){
        this.setState({
            projectID: projectID
        })
        console.log(this.state.projectID)
    }


    componentDidMount(){
        console.log(this.props.projectID)
        this.setProjectID(this.props.projectID)
//        this.setProjectName(this.props.projectName)
    }

    handleLoad(){
        
    }

    render() {
    return (
        <>
        </>
    )
    }
}

export default ProjectProfile;
