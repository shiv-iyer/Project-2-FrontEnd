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

    // then, we will use the map function to display the content from the posts

    render(){
        return (
            <React.Fragment>
                <div className="page-container">
                    <h1 className="centered p-3">View all posts</h1>
                    <Container id="postsContainer" className="p-3">
                        <div>{this.state.posts.map(post => (
                            <div key={post._id}>
                                <div className="border shadow">
                                    <h1 className="p-3">Post Name: {post.name}</h1>
                                    <h5 className="p-1">Posted by: {post.userThatPosted}</h5>
                                    <h5 className="p-1">Date posted: {post.dateOfCreation}</h5>
                                    <p className="p-3 mb-2">Overview: {post.postInfo.overview}</p>
                                    <p className="p-3 mb-2">Strategy: {post.postInfo.strategy}</p>
                                    <p className="p-3 mb-2">Archetype: {post.archetype}</p>
                                    <p className="p-1">Rating: {post.postInfo.rating}</p>
                                    <p className="p-1">Difficulty: {post.postInfo.difficultyLevel}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                        <Post/>
                        <Post/>
                        <Post/>
                    </Container>     
                </div>
            </React.Fragment>
        );
    }
}