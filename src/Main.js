import logo from './logo.svg';
import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// import all of the page components
import DisplayPost from "./components/DisplayPost";
import CreatePost from "./components/CreatePost";

// import React-Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Main will be a class-based component, because the state will be the current page
// Main will render every page

export default class Main extends React.Component {
    // state
    state = {
        
    }

    // functions
    render(){
        return (
            <React.Fragment>
                {/* Create the NavBar for the homepage, expand in full size at the md breakpoint and onwards */}
                    <Navbar expand="md" id="main-navbar">
                    <Container>
                    {/* Navbar.Brand is the main element in the navbar */}
                    <Navbar.Brand href="#home">
                        <img
                        src={logo}
                        width="35"
                        height="35"
                        className="d-inline-block align-center"
                        alt="RoyaleRaves logo"
                        />
                        Royale Raves</Navbar.Brand>
                    {/* Navbar.Toggle creates the 'hamburger menu', controls the collapsible Navbar */}
                    <Navbar.Toggle aria-controls="home-navbar"/>
                    <Navbar.Collapse id="home-navbar">
                        <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#create">Create a Post</Nav.Link>
                        <Nav.Link href="#posts">View Posts</Nav.Link>
                        <Nav.Link href="#cards">Cards</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                    </Navbar>
                    <CreatePost/>
                    <DisplayPost/>
            </React.Fragment>
        );
    }
};