import React from 'react';
import './Nav.css';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeLogFalse } from '../../actions/' 

function Nav() {

const isLogged = useSelector(state => state.isLogged)
const dispatch = useDispatch();

    return (
    <div className="Nav">
    <Navbar bg="dark" variant="dark">
  <Navbar.Brand href="/">AppTetra</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
    <a href="/Documentation">Documentation</a>
    { isLogged ?  <button onClick={ () => dispatch(changeLogFalse()) }>Log out</button> : '' }
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
    </div>
)};

export default Nav;
