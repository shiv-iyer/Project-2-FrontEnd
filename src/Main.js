import logo from './logo.svg';
import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// import all of the page components
import Home from './pages/Home';
import Creation from './pages/Creation';
import ViewPosts from './pages/ViewPosts';
import Cards from './pages/Cards';

// import React-Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Main will be a class-based component, because the state will be the current page
// Main will render every page

export default class Main extends React.Component {
    // state
    state = {
        currentPage: "home"
    }

    // functions
    switchPage = (event) => {
        this.setState({
            currentPage: event.target.name
        })
    }

    renderPage = () => {
        // switch statement doesn't need breaks because the return statement already ends the function
        switch (this.state.currentPage) {
            case "home":
                return <Home />
            case "create":
                return <Creation />
            case "posts":
                return <ViewPosts />
            case "cards":
                return <Cards/>
            // case "login":
            //     return <Login />
        }
    };

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
                            <Nav.Link name='home' href="#home" onClick={this.switchPage}>Home</Nav.Link>
                            <Nav.Link name='create' href="#create" onClick={this.switchPage}>Create a Post</Nav.Link>
                            <Nav.Link name='posts' href="#posts" onClick={this.switchPage}>View Posts</Nav.Link>
                            <Nav.Link name='cards' href="#cards" onClick={this.switchPage}>Cards</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>
                    {this.renderPage()}
            </React.Fragment>
        );
    }
};