import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Running extends Component {
    constructor(props) {
        super();
        this.state = {
            email: undefined,
            listOfRunning: undefined
    }
    }

    componentDidMount(){
        this.setState({
            listOfRunning: this.props.listOfRunning
        })
        console.log(this.state.listOfRunning)
    }

    componentDidUpdate(prevProps){
        if (this.props.listOfRunning !== prevProps.listOfRunning){
            this.setState({
                listOfRunning: this.props.listOfRunning
            })
        }
    }

    render() {
    return(
    <div className="Running">
    <header className="Running-header">
    { this.state.listOfRunning }
    </header>
    </div>
    )
    }
}

export default Running;
