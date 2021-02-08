import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class ProjectInfo extends Component {
    constructor(props) {
        super();
        this.state = {
            email: undefined,
            list: undefined
    }
    }

    componentDidMount(){
        this.setState({
            list: this.props.list
        })
        console.log(this.state.list)
    }

    componentDidUpdate(prevProps){
        if (this.props.list !== prevProps.list){
            this.setState({
                list: this.props.list
            })
        }
    }

    render() {
    return(
    <div className="Projects-Info">
    <header className="ProjectsInfo-header">
    { this.state.list }
    </header>
    </div>
    )
    }
}

export default ProjectInfo;
