import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Projects extends Component {
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
    <div className="Projects">
    <header className="Projects-header">
    { this.state.list }
    </header>
    </div>
    )
    }
}

export default Projects;
