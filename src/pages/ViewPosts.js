import React from "react";
import axios from "axios";
import "../pages.css";

// import components
import Post from "../components/Post";

// React Bootstrap imports
import Container from 'react-bootstrap/Container';

export default class ViewPosts extends React.Component {
    // state
    state = {
        numPosts: 1
    }

    // functions
    // componentDidMount() will probably call the axios get request

    render(){
        return (
            <React.Fragment>
                This is the view posts page.
                <Container id="postsContainer">
                    <h1>View all posts</h1>
                    <Post/>
                    <Post/>
                    <Post/>
                </Container>
            </React.Fragment>
        );
    }
}