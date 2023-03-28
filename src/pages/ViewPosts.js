import React from "react";
import "../pages.css";

// import components
import Post from "../components/Post";

// React Bootstrap imports
import Container from 'react-bootstrap/Container';

// API and Axios
import BASE_API from '../components/BaseApi';
import axios from "axios";

export default class ViewPosts extends React.Component {
    // state
    state = {
        // keep the data in the state within an array
        posts: [],
        numPosts: 1
    }

    // functions
    // componentDidMount() will probably call the axios get request

    // load posts function
    loadPosts = async () => {
        // get from API 
        // backtick strings `` and $ are for passing in a parameter as part of the string (axios.get requires a string?)
        // posts: the name of my collection I want to retrieve from, in this case it's posts
        const postsResponse = await axios.get(`${BASE_API}posts`);

        // set state from the response
        this.setState({
            // postsResponse.data.posts
            posts: postsResponse.data
        })

        // console log out to test
        console.log("posts: ");
        console.log(this.state.posts);
    }

    // on componentDidMount, call the function to load the posts

    componentDidMount = () => {
        try {
            this.loadPosts();
        } catch (error) {
            console.error(error);
        }
    }

    // then, we will use the map function to load the posts

    render(){
        return (
            <React.Fragment>
                <div className="page-container">
                    This is the view posts page.
                    <Container id="postsContainer">
                        <h1>View all posts</h1>
                        <Post/>
                        <Post/>
                        <Post/>
                    </Container>     
                </div>
            </React.Fragment>
        );
    }
}