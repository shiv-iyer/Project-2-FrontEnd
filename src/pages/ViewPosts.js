import React from "react";
import "../pages.css";

// import components
import Post from "../components/Post";

// React Bootstrap imports
import Container from 'react-bootstrap/Container';
import { Modal, Form } from "react-bootstrap";

// API and Axios
import BASE_API from '../components/BaseApi';
import axios from "axios";
import { Button } from "react-bootstrap";

export default class ViewPosts extends React.Component {
    // state
    state = {
        // keep the data in the state within an array
        posts: [],
        numPosts: 1,
        updatedName: "",
        updatedDate: "04-01-23",
        updatedCards: ["array of cards"],
        updatedArchetype: "",
        updatedOverview: "",
        updatedStrategy: "",
        updatedRating: 5,
        updatedDifficultyLevel: 3,
        editingPost: false
    }

    // functions
    // componentDidMount() will probably call the axios get request

    updatePost = (post) => {
        /*cards: this.getCardIDs(),
        name: this.state.name,
        userThatPosted: this.state.userThatPosted,
        date: "03-31-23",
        archetype: this.state.archetype,
        overview: this.state.overview,
        strategy: this.state.strategy,
        rating: this.state.rating,
        difficultyLevel: this.state.difficultyLevel*/

        // first step: setState so existing post info isn't lost
        this.setState({
            editingPost: true,
            updatedName: post.name,
            updatedDate: "04-01-23",
            updatedCards: ["array of cards"],
            updatedArchetype: post.archetype,
            updatedOverview: post.overview,
            updatedStrategy: post.strategy,
            updatedRating: post.rating,
            updatedDifficultyLevel: post.difficultyLevel
        });

    }

    cancelEdit = () => {
        this.setState({
            editingPost: false
        })
    }

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
                                    <Button
                                        variant="secondary"
                                        onClick={()=> this.updatePost(post)}
                                        >Edit</Button>
                                </div>
                            </div>
                        ))}
                        </div>
                        <Post/>
                        <Post/>
                        <Post/>
                    </Container>     
                </div>
                {/* show is linked to the state: only render when shown */}
                <Modal show={this.state.editingPost} onHide={this.cancelEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Post</Modal.Title>
                    </Modal.Header>
                    {/* main body of the modal popup */}
                    <Modal.Body>
                        <div className="post-form-group">
                            <Form>
                                <Form.Group controlId="inputName">
                                    <Form.Label>Post Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="updatedName"
                                        isInvalid={this.state.nameError}
                                        value={this.state.updatedName}
                                        aria-describedby="postNameHelp"
                                        onChange={this.updateFormField}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {this.state.nameError}
                                    </Form.Control.Feedback>
                                    <Form.Text id="postNameHelp" muted>
                                        {this.state.nameError ? null : "The name of your post — try to give your deck a descriptive title! (Max. 55 characters.)"}
                                    </Form.Text>
                                </Form.Group>
                            </Form>
                        </div>  
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.cancelEdit}>
                                Close
                        </Button>
                        <Button variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}