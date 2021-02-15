import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Purchases extends Component {
    constructor(props) {
        super();
        this.state = {
            email: undefined,
            listOfPurchases: undefined
    }
    }

    componentDidMount(){
        this.setState({
            listOfPurchases: this.props.listOfPurchases
        })
        console.log(this.state.list)
    }

    componentDidUpdate(prevProps){
        if (this.props.listOfPurchases !== prevProps.listOfPurchases){
            this.setState({
                listOfPurchases: this.props.listOfPurchases
            })
        }
    }

    render() {
    return(
    <div className="Projects">
    <header className="Projects-header">
    { this.state.listOfPurchases }
    </header>
    </div>
    )
    }
}

export default Purchases;
