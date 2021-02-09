import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Header } from 'semantic-ui-react';

class DeleteLoadingPage extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 10000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    return this.state.redirect
      ? <Redirect to="/HomePage" />
      :<Header as='h1'>Your Server is being deleted, please do not refresh or exit this page!</Header>
  }
}

export default DeleteLoadingPage;
