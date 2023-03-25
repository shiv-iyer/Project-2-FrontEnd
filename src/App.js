import logo from './logo.svg';
import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// import components
import DisplayPost from "./components/DisplayPost";
import CreatePost from "./components/CreatePost";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    // enclose everything within one React.Fragment
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
      <div className="App">
        <header className="App-header">
          <p>Welcome to RoyaleRaves, your #1 forum for Clash Royale decks!</p>
          <p>To get started, head over to the posts page to view all of our current posts, or alternatively, create one of your own.</p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <h3>
            Hello!!
          </h3>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;